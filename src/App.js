import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NexusGamingHome from './components/NexusGamingHome';
import BookingPage from './components/BookingPage/BookingPage';
import PerformanceMonitor from './components/PerformanceMonitor/PerformanceMonitor';

function App() {
  const [currentLang, setCurrentLang] = useState('es');
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  // Mostrar el monitor de performance solo en desarrollo
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NexusGamingHome lang={currentLang} setLang={setCurrentLang} />} />
        <Route path="/reservar" element={<BookingPage lang={currentLang} setLang={setCurrentLang} />} />
      </Routes>
      
      {/* Monitor de Performance - Solo visible en desarrollo */}
      {isDevelopment && (
        <PerformanceMonitor />
      )}
      
      {/* Botón discreto para mostrar/ocultar el monitor en desarrollo */}
      {isDevelopment && (
        <button
          className="performance-toggle"
          onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
          style={{
            position: 'fixed',
            bottom: '20px', // Cambiado a la parte inferior
            left: '20px',   // Cambiado a la izquierda
            zIndex: 9999,
            background: 'rgba(0, 123, 255, 0.8)', // Más transparente
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',  // Más pequeño
            height: '40px', // Más pequeño
            fontSize: '16px', // Más pequeño
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Sombra más sutil
            transition: 'all 0.3s ease',
            opacity: 0.7, // Más discreto
            backdropFilter: 'blur(10px)'
          }}
          title="Monitor de Performance"
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.7'}
        >
          📊
        </button>
      )}
    </Router>
  );
}

export default App;