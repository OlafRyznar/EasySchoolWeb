import React, { useEffect, useState } from 'react';

const GradesPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState(""); // Start with empty string to show all classes
  const [classes, setClasses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userRole, setUserRole] = useState(''); // Initialize with empty string
  const [showModal, setShowModal] = useState(false);
  const [newGrade, setNewGrade] = useState({ grade_value: '', description: '', subject_id: null });
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const allowedGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F']; // Allowed grade values
  const teacherId = localStorage.getItem('user_id');
  // Fetch user role from local storage
  useEffect(() => {
    const role = localStorage.getItem('user_role'); // Adjust key if needed
    console.log('User role from localStorage:', role); // Debug log
    if (role) {
      setUserRole(role);
    }
  }, []);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/student');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
        console.log('Students fetched:', data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Fetch all classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:8080/class');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClasses(data);
        console.log('Classes fetched:', data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // Filter students by class
  useEffect(() => {
    if (selectedClass === "") {
      setFilteredStudents(students); // Show all students
    } else {
      const selectedClassObj = classes.find(cls => cls.class_name === selectedClass);
      if (selectedClassObj) {
        const filtered = students.filter(student => student.class_id === selectedClassObj.class_id);
        setFilteredStudents(filtered);
      } else {
        setFilteredStudents([]);
      }
    }
  }, [selectedClass, students, classes]);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentSubjects(selectedStudent);
      fetchGradesForStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const fetchStudentSubjects = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/student_subject/${studentId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudentSubjects(data);
      console.log('Student subjects fetched:', data);
      setDataLoaded(true);
    } catch (error) {
      console.error('Error fetching student subjects:', error);
      setStudentSubjects([]);
      setDataLoaded(true);
    }
  };

  const fetchGradesForStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/grade/${studentId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGrades(data);
      console.log('Grades for selected student fetched:', data);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setGrades([]);
    }
  };

  const handleStudentClick = (studentId) => {
    setSelectedStudent(studentId);
    setDataLoaded(false);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleAddGradeClick = (subjectId) => {
    setNewGrade({ ...newGrade, subject_id: subjectId });
    setShowModal(true);
    setErrorMessage(''); // Clear any previous error messages
  };

  const handleGradeSubmit = async () => {
    if (!newGrade.grade_value || !newGrade.subject_id) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!allowedGrades.includes(newGrade.grade_value)) {
      setErrorMessage('Invalid grade value. Please enter a valid grade (e.g., A+, B, C-).');
      return;
    }
console.log(teacherId)
    try {
      const response = await fetch('http://localhost:8080/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGrade,
          student_id: selectedStudent,
          added_by: 1,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchGradesForStudent(selectedStudent); // Refresh grades
      setShowModal(false);
      
    } catch (error) {
      console.error('Error adding grade:', error);
      setErrorMessage('Error adding grade. Please try again.');
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-700';
      case 'A': return 'bg-green-500';
      case 'A-': return 'bg-green-400';
      case 'B+': return 'bg-yellow-500';
      case 'B': return 'bg-yellow-400';
      case 'B-': return 'bg-yellow-300';
      case 'C+': return 'bg-orange-500';
      case 'C': return 'bg-orange-400';
      case 'C-': return 'bg-orange-300';
      case 'D+': return 'bg-red-500';
      case 'D': return 'bg-red-400';
      case 'D-': return 'bg-red-400';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  const gradesBySubject = grades.reduce((acc, grade) => {
    if (!acc[grade.subject_id]) {
      acc[grade.subject_id] = [];
    }
    acc[grade.subject_id].push(grade);
    return acc;
  }, {});

  const filteredSubjects = studentSubjects;

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Class</h1>
      <select
        onChange={handleClassChange}
        value={selectedClass}
        className="p-2 mb-4 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Classes</option>
        {classes.map((classItem) => (
          <option key={classItem.class_id} value={classItem.class_name}>
            {classItem.class_name}
          </option>
        ))}
      </select>

      <h1 className="text-2xl font-bold mb-4">Select a Student</h1>
      <div className="w-full max-w-4xl bg-[#f4f4f4] rounded-lg shadow-lg p-8 mb-8">
        <div className="flex flex-wrap gap-4">
          {filteredStudents.map((student) => (
            <button
              key={student.student_id}
              onClick={() => handleStudentClick(student.student_id)}
              className="p-4 bg-blue-200 rounded-lg shadow-md hover:bg-blue-300 transition-colors"
            >
              {student.first_name} {student.last_name}
            </button>
          ))}
        </div>
      </div>

      {dataLoaded && selectedStudent && (
        <div className="w-full max-w-4xl bg-[#f4f4f4] rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Subjects for Student ID: {selectedStudent}</h2>
          {filteredSubjects.length > 0 ? (
            <div className="flex flex-col gap-8">
              {filteredSubjects.map((subject) => (
                <div key={subject.subject_id} className="p-4 bg-blue-100 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold mb-4">{subject.name}</h3>
                    {userRole === 'teacher' && (
                      <button
                        onClick={() => handleAddGradeClick(subject.subject_id)}
                        className="text-2xl text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {gradesBySubject[subject.subject_id] && gradesBySubject[subject.subject_id].length ? (
                      gradesBySubject[subject.subject_id].map((grade) => (
                        <div key={grade.grade_id} className="w-16 h-16 flex items-center justify-center relative">
                          <div
                            className={`w-16 h-16 flex items-center justify-center border border-black text-4xl font-semibold text-white ${getGradeColor(grade.grade_value)}`}
                          >
                            {grade.grade_value}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No grades available for this subject</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No subjects available for this student</div>
          )}
        </div>
      )}

      {/* Modal for adding a new grade */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Add Grade</h2>
            {errorMessage && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Grade</label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg w-full"
                value={newGrade.grade_value}
                onChange={(e) => setNewGrade({ ...newGrade, grade_value: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
              <textarea
                className="p-2 border border-gray-300 rounded-lg w-full"
                value={newGrade.description}
                onChange={(e) => setNewGrade({ ...newGrade, description: e.target.value })}
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleGradeSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradesPage;
