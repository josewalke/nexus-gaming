import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import cacheManager from './utils/cacheManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar Service Worker (opcional, solo para cache básico)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration);
      })
      .catch((error) => {
        console.error('❌ Error registrando Service Worker:', error);
      });
  });
}

// Exportar cacheManager para uso global
window.cacheManager = cacheManager;