import React from 'react';

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          {/* FAQ Section */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Frequently Asked Questions</h2>
            <ul className="space-y-4">
              <li>
                <strong className="text-blue-600">How do I reset my password?</strong>
                <p className="mt-1 text-gray-700">To reset your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your email.</p>
              </li>
              <li>
                <strong className="text-blue-600">How do I contact support?</strong>
                <p className="mt-1 text-gray-700">You can contact support by sending an email to <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a>.</p>
              </li>
              <li>
                <strong className="text-blue-600">Where can I find the user guides?</strong>
                <p className="mt-1 text-gray-700">User guides are available in the "Resources" section of your dashboard or on our website under "Help & Support".</p>
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Contact Us</h2>
            <p className="text-gray-700">If you have any other questions or need further assistance, please don't hesitate to reach out to us:</p>
            <ul className="mt-4 space-y-2">
              <li>
                <strong className="text-blue-600">Email:</strong> <a href="mailto:support@example.com" className="text-blue-500 hover:underline">support@example.com</a>
              </li>
              <li>
                <strong className="text-blue-600">Phone:</strong> (123) 456-7890
              </li>
            </ul>
          </section>

          {/* User Guides Section */}
          <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">User Guides</h2>
            <ul className="space-y-2">
              <li>
                <a href="/guide/getting-started" className="text-blue-500 hover:underline">Getting Started Guide</a>
              </li>
              <li>
                <a href="/guide/advanced-features" className="text-blue-500 hover:underline">Advanced Features Guide</a>
              </li>
              <li>
                <a href="/guide/troubleshooting" className="text-blue-500 hover:underline">Troubleshooting Guide</a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
