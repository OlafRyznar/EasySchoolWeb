import React from 'react';

const MobileAppPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          {/* App Features Section */}
          <section className="mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">Why Download Our App?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
                <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
                <p>Receive real-time notifications and stay updated with your education, no matter where you are.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
                <h3 className="text-xl font-semibold mb-4">Access Resources</h3>
                <p>Access your study materials, schedules, and important resources directly from your phone.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
                <h3 className="text-xl font-semibold mb-4">Manage Your Tasks</h3>
                <p>Track your assignments, grades, and deadlines easily and efficiently.</p>
              </div>
            </div>
          </section>

          {/* Download Links Section */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Get the App Now</h2>
            <p className="mb-8">Download our app for convenient access on the go. Available on iOS and Android.</p>
            <div className="flex justify-center gap-4">
              <a href="https://apps.apple.com" className="bg-white shadow-md rounded-lg p-4 flex items-center">
                <img src="/assets/iOS.svg" alt="Download on the App Store" className="h-12"/>
                <span className="ml-4 text-blue-700 font-semibold">Download on the App Store</span>
              </a>
              <a href="https://play.google.com" className="bg-white shadow-md rounded-lg p-4 flex items-center">
                <img src="/assets/Android.svg" alt="Get it on Google Play" className="h-12"/>
                <span className="ml-4 text-green-700 font-semibold">Get it on Google Play</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MobileAppPage;
