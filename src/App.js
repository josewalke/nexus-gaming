import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NexusGamingHome from './components/NexusGamingHome';
import BookingPage from './components/BookingPage/BookingPage';

function App() {
  const [currentLang, setCurrentLang] = useState('es');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NexusGamingHome lang={currentLang} setLang={setCurrentLang} />} />
        <Route path="/reservar" element={<BookingPage lang={currentLang} setLang={setCurrentLang} />} />
      </Routes>
    </Router>
  );
}

export default App;