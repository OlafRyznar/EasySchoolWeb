import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showEmailList, setShowEmailList] = useState(false);
  const [users, setUsers] = useState([]);
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [view, setView] = useState('received'); // "received" or "sent"

  const userIdFromStorage = localStorage.getItem('user_id');
  const loggedInUserId = parseInt(userIdFromStorage, 10);

  useEffect(() => {
    if (isNaN(loggedInUserId)) {
      console.error('Invalid user ID:', loggedInUserId);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchEmails = async () => {
      try {
        const [receivedResponse, sentResponse] = await Promise.all([
          axios.get(`http://localhost:8080/mail?receiver_id=${loggedInUserId}`),
          axios.get(`http://localhost:8080/mail?sender_id=${loggedInUserId}`)
        ]);
        setReceivedEmails(receivedResponse.data);
        setSentEmails(sentResponse.data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchUsers();
    fetchEmails();
  }, [loggedInUserId]);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
    setShowEmailList(true);
  };

  const handleSelectEmail = (email) => {
    setRecipient(email);
    setShowEmailList(false);
  };

  const handleSendEmail = async () => {
    if (recipient && subject && message) {
      const receiver = users.find(user => user.email === recipient)?.id;

      if (!receiver) {
        alert('Recipient not found');
        return;
      }

      try {
        await axios.post('http://localhost:8080/mail', {
          sender_id: loggedInUserId,
          receiver_id: receiver,
          subject,
          body: message,
          sent_at: new Date().toISOString() // Ensure this is formatted correctly for your backend
        });
        alert('Email sent successfully');
        setRecipient('');
        setSubject('');
        setMessage('');
        // Refresh emails
        const [receivedResponse, sentResponse] = await Promise.all([
          axios.get(`http://localhost:8080/mail?receiver_id=${loggedInUserId}`),
          axios.get(`http://localhost:8080/mail?sender_id=${loggedInUserId}`)
        ]);
        setReceivedEmails(receivedResponse.data);
        setSentEmails(sentResponse.data);
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  // Filter emails based on the logged-in user
  const filteredReceivedEmails = receivedEmails.filter(email => email.receiver_id === loggedInUserId);
  const filteredSentEmails = sentEmails.filter(email => email.sender_id === loggedInUserId);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Sidebar - Emails */}
      <div className="md:w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Emails</h2>
        <button
          onClick={() => handleViewChange('received')}
          className={`px-4 py-2 mr-2 ${view === 'received' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Received
        </button>
        <button
          onClick={() => handleViewChange('sent')}
          className={`px-4 py-2 ${view === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sent
        </button>
        {view === 'received' && filteredReceivedEmails.length === 0 ? (
          <p>No received emails.</p>
        ) : view === 'sent' && filteredSentEmails.length === 0 ? (
          <p>No sent emails.</p>
        ) : (
          <ul>
            {(view === 'received' ? filteredReceivedEmails : filteredSentEmails).map(email => (
              <li key={email._id} className="border-b border-gray-300 py-2">
                {view === 'received' && (
                  <>
                    <p><strong>From:</strong> {email.sender_id}</p>
                    <p><strong>To:</strong> {email.receiver_id}</p>
                  </>
                )}
                {view === 'sent' && (
                  <>
                    <p><strong>To:</strong> {email.receiver_id}</p>
                  </>
                )}
                <p><strong>Subject:</strong> {email.subject}</p>
                <p><strong>Body:</strong> {email.body}</p>
                <p><strong>Sent At:</strong> {new Date(email.sent_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
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
                  key={user.id} // Ensure each list item has a unique key
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
