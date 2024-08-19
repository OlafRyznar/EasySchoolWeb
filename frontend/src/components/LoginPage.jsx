import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/logo1.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Sprawdź, czy użytkownik jest już zalogowany
  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    if (userRole) {
      // Jeśli użytkownik jest już zalogowany, przekieruj go do odpowiedniej strony
      if (userRole === 'student') {
        navigate('/student');
      } else if (userRole === 'teacher') {
        navigate('/teacher');
      } else if (userRole === 'guardian') {
        navigate('/guardian');
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Wysłanie żądania POST do login.php
      const response = await axios.post('http://localhost:8080/login.php', { email, password });

      // Destrukturyzacja danych odpowiedzi
      const { success, role, user_id } = response.data;

      if (success) {
        // Przechowywanie danych użytkownika w localStorage
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('user_role', role);
        localStorage.setItem('user_email', email); // Zapisanie loginu (e-mail) w localStorage

        // Przekierowanie w zależności od roli
        if (role === 'student') {
          navigate('/student');
        } else if (role === 'teacher') {
          navigate('/teacher');
        } else if (role === 'guardian') {
          navigate('/guardian');
        }
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fcf6f6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <img
          className="w-48 h-28 mx-auto mb-6"
          src={logo1}
          alt="Logo"
        />
        <div className="text-center text-4xl font-extrabold text-[#519bf3] font-['Bitter'] mb-6">Login</div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-xl font-medium mb-2">Login (e-mail address)</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#519bf3] text-white text-2xl font-extrabold rounded-lg shadow mb-4"
        >
          Login
        </button>
        <div className="flex justify-between">
          <button
            onClick={handleCreateAccount}
            className="text-[#519bf3] text-xl font-extrabold"
          >
            Create account
          </button>
          <button className="text-[#519bf3] text-xl font-extrabold">Forgot password</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
