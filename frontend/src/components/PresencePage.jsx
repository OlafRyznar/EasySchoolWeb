import React, { useEffect, useState } from 'react';

const PresencePage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendance, setAttendance] = useState({});

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
        setLoading(false); // Ustawienie na false po zakończeniu pobierania danych
      } catch (error) {
        setError('Błąd podczas pobierania studentów');
        setLoading(false); // Ustawienie na false po wystąpieniu błędu
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
      } catch (error) {
        setError('Błąd podczas pobierania klas');
      }
    };

    fetchClasses();
  }, []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setAttendance({});
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance({
      ...attendance,
      [studentId]: !attendance[studentId],
    });
  };

  const handleSaveAttendance = () => {
    // Implement save attendance logic here
    console.log('Attendance data:', attendance);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full h-auto bg-white p-8">
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Lista obecności</h1>

        {/* Class selection */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Wybierz klasę:</label>
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Wybierz klasę --</option>
            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_name}>
                {cls.class_name}
              </option>
            ))}
          </select>
        </div>

        {/* Student table with attendance */}
        {selectedClass && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presence</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.student_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.student_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.first_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.last_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="checkbox"
                        checked={attendance[student.student_id] || false}
                        onChange={() => handleAttendanceChange(student.student_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSaveAttendance}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Zapisz obecność
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresencePage;
