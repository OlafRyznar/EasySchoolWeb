import React from 'react';
import { Link } from 'react-router-dom';

const ParentPage = () => {
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
            Monitor your child's academic performance. View grades and feedback on assignments and exams.
          </p>
        </Link>

        {/* Dues Tile */}
        <Link
          to="/dues"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Dues</div>
          <p className="text-black text-xl text-center">
            Manage and view any outstanding payments or fees. Stay updated on dues related to school activities and services.
          </p>
        </Link>

        {/* Schedule Tile */}
        <Link
          to="/schedule"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Schedule</div>
          <p className="text-black text-xl text-center">
            Stay informed about your child's daily schedule. Check class times and upcoming school events.
          </p>
        </Link>

        {/* Tests Tile */}
        <Link
          to="/tests"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Tests</div>
          <p className="text-black text-xl text-center">
            Keep track of upcoming tests and exam dates. See test results and any provided feedback.
          </p>
        </Link>

        {/* Contact Tile */}
        <Link
          to="/contact"
          className="relative w-full h-64 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-3xl font-extrabold mb-2">Contact</div>
          <p className="text-black text-xl text-center">
            Communicate with teachers and school staff. Receive important announcements and updates about your child's education.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ParentPage;
