import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importuj useNavigate i useLocation z react-router-dom
import logo1 from '../assets/logo1.png'; // Zaktualizuj ścieżkę do swojego pliku
import backArrow from '../assets/back-arrow.svg'; // Importuj obrazek strzałki

const SecondaryHeader = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const pageTitle = location.pathname.split('/').pop(); // Pobierz nazwę strony z URL

  // Mapowanie ścieżek na tytuły stron
  const titles = {
    'grades': 'Grades',
    'teacher': 'For Teacher',
    'student': 'For Student',
    'parent': 'For Parent',
    'other': 'Other',
    'schedule': 'Schedule',
    'presence': 'Presence',
    'library': 'Library',
    'contact': 'Contact',
    'mobile-app': 'Mobile App',
    'help': 'Help',
    'about-us': 'About Us',
    'dues': 'Dues',
    'exams': 'Exams'
    // Dodaj inne strony, jeśli potrzebne
  };

  // Wyszukaj odpowiedni tytuł
  const currentTitle = titles[pageTitle] || 'Page';

  return (
    <div className="w-full h-auto px-4 py-4 bg-[#fcf6f6] flex items-center justify-between">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate one step back in history
        className="text-[#519bf3] text-2xl flex items-center"
      >
        <img src={backArrow} alt="Back" className="w-8 h-8" /> {/* Użyj obrazka jako strzałki */}
      </button>

      {/* Logo Section */}
      <img
        className="w-[35%] max-w-[150px] h-auto cursor-pointer"
        src={logo1}
        alt="Logo 1"
        onClick={() => navigate('/')} // Przenieś użytkownika na stronę główną
      />

      {/* Page Title */}
      <div className="flex-grow text-[#519bf3] text-5xl font-extrabold font-['Bitter'] text-center mr-40">
        {currentTitle}
      </div>
    </div>
  );
};

export default SecondaryHeader;
