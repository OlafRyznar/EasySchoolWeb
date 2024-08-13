import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showEmailList, setShowEmailList] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch users from the server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users'); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setShowEmailList(true);
  };

  const handleSelectEmail = (email) => {
    setRecipient(email);
    setShowEmailList(false);
  };

  const handleSendEmail = () => {
    if (recipient && subject && message) {
      alert(`Email sent to ${recipient} with subject "${subject}"`);
      setRecipient('');
      setSubject('');
      setMessage('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Sidebar - Received Emails */}
      <div className="md:w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Received Emails</h2>
        {/* Render received emails here */}
      </div>

      {/* Right Section - Compose Email */}
      <div className="md:w-2/3 p-4 md:p-8 flex-1">
        <h2 className="text-lg font-bold mb-4">Compose Email</h2>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1" htmlFor="recipient">To:</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={handleRecipientChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showEmailList && (
            <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {users.filter(user => user.email.toLowerCase().includes(recipient.toLowerCase())).map(user => (
                <li
                  key={user.id}
                  onClick={() => handleSelectEmail(user.email)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="10"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSendEmail}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
