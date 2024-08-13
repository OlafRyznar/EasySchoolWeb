import React from 'react';

function MobileAppPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Mobile App</h1>
        <p className="text-gray-700 mb-4">Download our mobile app to stay connected on the go. Available for both iOS and Android devices.</p>
        <div className="flex justify-center gap-4">
          <img className="w-32 h-12" src="https://via.placeholder.com/120x40?text=App+Store" alt="App Store" />
          <img className="w-32 h-12" src="https://via.placeholder.com/120x40?text=Google+Play" alt="Google Play" />
        </div>
      </div>
    </div>
  );
}

export default MobileAppPage;
