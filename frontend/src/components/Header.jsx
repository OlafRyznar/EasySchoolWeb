import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importuj Link i useNavigate z react-router-dom
import logo1 from '../assets/logo1.png'; // Zaktualizuj ścieżkę do swojego pliku
import logo2 from '../assets/logo2.png'; // Zaktualizuj ścieżkę do swojego pliku

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('user_role'); // Pobierz rolę użytkownika z localStorage

  // Sprawdź, które linki powinny być aktywne
  const isStudentActive = userRole !== 'teacher' && userRole !== 'guardian';
  const isTeacherActive = userRole !== 'student' && userRole !== 'guardian';
  const isParentActive = userRole !== 'student' && userRole !== 'teacher';

  // Funkcja obsługująca kliknięcia w linki
  const handleClick = (event, isActive, to) => {
    if (!userRole || !isActive) {
      event.preventDefault(); // Zapobiegaj domyślnemu działaniu linku
      navigate('/login'); // Przekierowanie do strony logowania
    } else {
      navigate(to); // Nawiguj do linku, jeśli jest aktywny
    }
  };

  // Funkcja obsługująca wylogowanie
  const handleSignOff = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    navigate('/login'); // Przekierowanie do strony logowania po wylogowaniu
  };

  // Funkcja obsługująca logowanie
  const handleLogin = () => {
    navigate('/login'); // Przekierowanie do strony logowania
  };

  return (
    <div className="w-full h-auto px-4 py-8 bg-[#fcf6f6] flex flex-col items-center md:items-center md:flex-col lg:flex-row lg:justify-between lg:items-center lg:px-24">
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-4 mb-6 lg:mb-0 lg:flex-row lg:items-start lg:gap-4">
        <img className="w-[35%] max-w-[250px] h-auto" src={logo1} alt="Logo 1" />
        <img className="w-[60%] max-w-[250px] h-auto lg:mt-4" src={logo2} alt="Logo 2" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 lg:flex-row lg:gap-10">
        <a
          href="/student"
          onClick={(e) => handleClick(e, isStudentActive, '/student')}
          className={`text-[2rem] font-extrabold font-['Bitter'] mb-2 text-center md:text-left md:mb-0 ${userRole && isStudentActive ? 'text-[#519bf3]' : 'text-gray-500 cursor-not-allowed'}`}
        >
          For student
        </a>
        <a
          href="/teacher"
          onClick={(e) => handleClick(e, isTeacherActive, '/teacher')}
          className={`text-[2rem] font-extrabold font-['Bitter'] mb-2 text-center md:text-left md:mb-0 ${userRole && isTeacherActive ? 'text-[#519bf3]' : 'text-gray-500 cursor-not-allowed'}`}
        >
          For teacher
        </a>
        <a
          href="/parent"
          onClick={(e) => handleClick(e, isParentActive, '/parent')}
          className={`text-[2rem] font-extrabold font-['Bitter'] mb-2 text-center md:text-left md:mb-0 ${userRole && isParentActive ? 'text-[#519bf3]' : 'text-gray-500 cursor-not-allowed'}`}
        >
          For parent
        </a>
        <Link
          to="/other"
          className="text-[#519bf3] text-[2rem] font-extrabold font-['Bitter'] mb-2 text-center md:text-left md:mb-0"
        >
          Other
        </Link>
      </div>

      {/* Sign off or login link */}
      <div className="absolute top-4 right-4">
        {!userRole ? (
          <button
            onClick={handleLogin}
            className="text-gray-600 text-lg font-semibold hover:text-gray-800"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleSignOff}
            className="text-gray-600 text-lg font-semibold hover:text-gray-800"
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
