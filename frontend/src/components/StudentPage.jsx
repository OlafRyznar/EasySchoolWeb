import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full h-auto bg-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Grades Tile */}
        <div
          onClick={() => handleNavigation('/grades')}
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Grades</div>
          <p className="text-black text-xl text-center">
            View your academic performance and detailed grades for all subjects.
          </p>
        </div>

        {/* E-Library Tile */}
        <div
          onClick={() => handleNavigation('/e-library')}
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">E-Library</div>
          <p className="text-black text-xl text-center">
            Browse and access a vast collection of digital books, articles, and resources.
          </p>
        </div>

        {/* Schedule Tile */}
        <div
          onClick={() => handleNavigation('/schedule')}
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Schedule</div>
          <p className="text-black text-xl text-center">
            Access your class timetable and keep track of upcoming lessons and events.
          </p>
        </div>

        {/* Tests Tile */}
        <div
          onClick={() => handleNavigation('/tests')}
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Tests</div>
          <p className="text-black text-xl text-center">
            Take online tests and quizzes to assess your knowledge and skills.
          </p>
        </div>

        {/* Contact Tile */}
        <div
          onClick={() => handleNavigation('/contact')}
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Contact</div>
          <p className="text-black text-xl text-center">
            Reach out to your teachers and school administration for assistance and inquiries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
