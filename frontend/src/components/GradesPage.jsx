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
                  <h3 className="text-xl font-semibold mb-4">{subject.name}</h3>
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
    </div>
  );
};

export default GradesPage;
