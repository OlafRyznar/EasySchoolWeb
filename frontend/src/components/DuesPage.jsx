import React, { useState, useEffect } from 'react';

const DuesPage = () => {
  const [dues, setDues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDue, setSelectedDue] = useState(null);

  useEffect(() => {
    const fetchDues = async () => {
      try {
        // Get user_id from localStorage
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
          throw new Error('User ID is not available in localStorage');
        }

        // Fetch dues for the user_id
        const response = await fetch(`http://localhost:8080/dues/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dues');
        }
        const data = await response.json();
        setDues(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDues();
  }, []);

  const handleDetailsClick = (due) => {
    // Toggle the details view for the selected due
    setSelectedDue(selectedDue === due ? null : due);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-auto bg-white p-8">
      <div className="max-w-6xl mx-auto mt-8">
        <div className="border border-gray-300 rounded-lg shadow-lg">
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-gray-300 bg-gray-100 text-center font-semibold h-20">
            <div className="py-4">Due Name</div>
            <div className="py-4">Amount</div>
            <div className="py-4">Due Date</div>
            <div className="py-4">Actions</div>
          </div>

          {/* Dues List */}
          <div className="divide-y divide-gray-300">
            {dues.length > 0 ? (
              dues.map((due) => (
                <div key={due.id} className="grid grid-cols-4 items-center text-center p-4 bg-gray-50 hover:bg-gray-100">
                  <div>{due.name}</div>
                  <div>{due.amount}</div>
                  <div>{due.due_date}</div>
                  <div className="flex justify-center space-x-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Pay</button>
                    <button 
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                      onClick={() => handleDetailsClick(due)}
                    >
                      Details
                    </button>
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">Edit</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4">No dues found.</div>
            )}
          </div>
        </div>

        {/* Detailed Information */}
        {selectedDue && (
          <div className="mt-8 border border-gray-300 rounded-lg p-6 shadow-lg bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Due Details</h2>
            <p><strong>Name:</strong> {selectedDue.name}</p>
            <p><strong>Amount:</strong> {selectedDue.amount}</p>
            <p><strong>Due Date:</strong> {selectedDue.due_date}</p>
            {/* Add more details as needed */}
            <button 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={() => setSelectedDue(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuesPage;
