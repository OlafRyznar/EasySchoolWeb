import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtherPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="relative bg-white w-full min-h-screen">
      {/* Kafelki Section */}
      <div className="flex flex-wrap justify-center gap-8 p-8 mt-32">
        {/* Create Account Tile */}
        <div
          onClick={() => handleNavigation('/create-account')}
          className="relative w-80 h-80 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-4xl font-extrabold mb-4">Create Account</div>
          <p className="text-black text-lg text-center">
            Sign up to access all the features of our platform. Create a new account for parents, teachers, or students.
          </p>
        </div>

        {/* Help Tile */}
        <div
          onClick={() => handleNavigation('/help')}
          className="relative w-80 h-80 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-4xl font-extrabold mb-4">Help</div>
          <p className="text-black text-lg text-center">
            Find answers to common questions and get support. Access user guides and tutorials to navigate the platform.
          </p>
        </div>

        {/* Mobile App Tile */}
        <div
          onClick={() => handleNavigation('/mobile-app')}
          className="relative w-80 h-80 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-4xl font-extrabold mb-4">Mobile App</div>
          <p className="text-black text-lg text-center">
            Download our mobile app for convenient access on the go. Stay connected and updated with your education from anywhere.
          </p>
        </div>

        {/* About Us Tile */}
        <div
          onClick={() => handleNavigation('/about-us')}
          className="relative w-80 h-80 bg-[#e5edf7] rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="text-[#519bf3] text-4xl font-extrabold mb-4">About Us</div>
          <p className="text-black text-lg text-center">
            Learn about our mission and values. Meet the team and our commitment to quality education.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherPage;
