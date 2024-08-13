// src/components/HomePage.jsx

import React, { useEffect } from 'react';
import videoSrc from '../assets/video1.mp4'; // Import wideo
import './HomePage.css'; // Import stylów

const HomePage = () => {
  useEffect(() => {
    // Dodaj klasę do body, aby zablokować przewijanie
    document.body.classList.add('home-page-scroll-lock');
    
    return () => {
      // Usuń klasę po odmontowaniu komponentu
      document.body.classList.remove('home-page-scroll-lock');
    };
  }, []);

  return (
    <div className="home-page w-full h-screen overflow-hidden">
      <video 
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomePage;
