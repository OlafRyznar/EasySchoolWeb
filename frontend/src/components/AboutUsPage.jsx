import React from 'react';

function AboutUsPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-700 mb-4">We are committed to providing the best educational experience. Learn more about our mission, values, and the team behind our platform.</p>
        <p className="text-gray-700">Our mission is to make education accessible and engaging for everyone. We believe in leveraging technology to improve learning outcomes and support educators, parents, and students alike.</p>
      </div>
    </div>
  );
}

export default AboutUsPage;
