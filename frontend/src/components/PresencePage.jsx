// src/components/PresencePage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PresencePage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobierz listę studentów z backendu
    axios.get('http://localhost:8080/student')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full h-auto bg-white p-8">
      <div className="max-w-6xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Lista studentów</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.student_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.student_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.first_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.last_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class_id || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PresencePage;
