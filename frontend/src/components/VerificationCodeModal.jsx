import React, { useState, useEffect, useRef } from 'react';

const VerificationCodeModal = ({ isVisible, onClose, onSubmit, verificationCode }) => {
  const [inputCode, setInputCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!isVisible) {
      setInputCode(['', '', '', '', '', '']);
      setError('');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only one digit per input
    if (/^\d?$/.test(value)) {
      const newCode = [...inputCode];
      newCode[index] = value;

      setInputCode(newCode);

      // Move focus to the next input if digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      // Move focus to the previous input if backspace is pressed
      if (value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const code = inputCode.join('');
    if (code.length === 6) {
      if (code === verificationCode) {
        onSubmit();
      } else {
        setError('Invalid verification code. Please try again.');
        setInputCode(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      }
    } else {
      setError('Please enter a 6-digit code.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Verification Code</h2>
        <p className="mb-4">Please enter the 6-digit code sent to your email.</p>
        <div className="flex space-x-2">
          {inputCode.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              ref={(el) => inputRefs.current[index] = el}
              className="w-12 h-12 border rounded text-center text-xl"
              style={{ letterSpacing: '0.5em' }}
              autoFocus={index === 0}
            />
          ))}
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeModal;
