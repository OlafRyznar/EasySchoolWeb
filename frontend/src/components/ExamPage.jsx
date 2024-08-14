import React, { useState, useEffect } from 'react';

const ExamPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newExam, setNewExam] = useState({
    name: '',
    subject_id: '',
    description: '',
    date: '',
    score: ''
  });
  const [userRole, setUserRole] = useState(''); // Role of the user

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const response = await fetch(`http://localhost:8080/exams/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }

        const data = await response.json();
        setExams(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const role = localStorage.getItem('user_role');
    setUserRole(role);

    fetchExams();
  }, []);

  const handleChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      const examData = {
        ...newExam,
        user_id: userId,
        added_by: userId
      };

      console.log('Exam data to be sent:', examData);

      const response = await fetch('http://localhost:8080/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        let errorText = await response.text();
        console.error('Error response body:', errorText);

        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || 'Failed to create exam');
        } catch {
          throw new Error('Failed to create exam: ' + errorText);
        }
      }

      const result = await response.json();
      alert(`Exam created with ID: ${result.id}`);

      const updatedExamsResponse = await fetch(`http://localhost:8080/exams/${userId}`);
      if (!updatedExamsResponse.ok) {
        throw new Error('Failed to fetch updated exams');
      }
      const updatedExamsData = await updatedExamsResponse.json();
      setExams(updatedExamsData);

      setNewExam({
        name: '',
        subject_id: '',
        description: '',
        date: '',
        score: ''
      });
    } catch (error) {
      console.error('Error during form submission:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-300 bg-blue-100 text-center font-semibold p-4">
          <div className="text-lg">Exams</div>
        </div>

        <div className="p-4">
          {userRole === 'teacher' && (
            <form onSubmit={handleSubmit} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Exam</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Exam Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newExam.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Subject ID</label>
                  <input
                    type="text"
                    name="subject_id"
                    value={newExam.subject_id}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={newExam.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newExam.date}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Score (%)</label>
                  <input
                    type="number"
                    name="score"
                    value={newExam.score}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
              >
                Add Exam
              </button>
            </form>
          )}

          <div className="divide-y divide-gray-300">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div
                  key={exam.exam_id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white hover:bg-gray-50"
                >
                  <div className="text-center">{exam.name}</div>
                  <div className="text-center">{exam.description}</div>
                  <div className="text-center">{new Date(exam.date).toLocaleDateString()}</div>
                  <div className="text-center">{exam.score ? `${exam.score}%` : 'N/A'}</div>
                </div>
              ))
            ) : (
              <div className="text-center p-4">No exams found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
