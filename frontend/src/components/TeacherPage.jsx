// src/components/TeacherPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const TeacherPage = () => {
  return (
    <div className="w-full h-auto bg-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Grades Tile */}
        <Link
          to="/grades"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Grades</div>
          <p className="text-black text-xl text-center">
            View and manage student grades. Enter new scores and provide feedback on assignments and exams.
          </p>
        </Link>

        {/* E-Library Tile */}
        <Link
          to="/library"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">E-Library</div>
          <p className="text-black text-xl text-center">
            Browse and access a vast collection of digital books, articles, and resources.
          </p>
        </Link>

        {/* Schedule Tile */}
        <Link
          to="/schedule"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Schedule</div>
          <p className="text-black text-xl text-center">
            Access your teaching schedule. Plan lessons and view upcoming classes and important dates.
          </p>
        </Link>

        {/* Tests Tile */}
        <Link
          to="/tests"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Tests</div>
          <p className="text-black text-xl text-center">
            Create, assign, and evaluate tests for your students. Monitor test submissions and track performance.
          </p>
        </Link>

        {/* Presence Tile */}
        <Link
          to="/presence"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Presence</div>
          <p className="text-black text-xl text-center">
            Track and manage student attendance. Mark presence or absence and review attendance reports.
          </p>
        </Link>

        {/* Contact Tile */}
        <Link
          to="/contact"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Contact</div>
          <p className="text-black text-xl text-center">
            Reach out to your teachers and school administration for assistance and inquiries.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default TeacherPage;
