import React, { useState } from 'react';
import './CacheCleaner.css';

const CacheCleaner = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const clearAllCaches = async () => {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
        await Promise.all(deletePromises);
        return `✅ ${cacheNames.length} caches eliminados`;
      }
      return '⚠️ Cache API no disponible';
    } catch (error) {
      throw new Error(`Error al limpiar caches: ${error.message}`);
    }
  };

  const unregisterServiceWorkers = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const unregisterPromises = registrations.map(registration => registration.unregister());
        await Promise.all(unregisterPromises);
        return `✅ ${registrations.length} service workers desregistrados`;
      }
      return '⚠️ Service Workers no disponibles';
    } catch (error) {
      throw new Error(`Error al desregistrar service workers: ${error.message}`);
    }
  };

  const clearStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      return '✅ Storage limpiado';
    } catch (error) {
      throw new Error(`Error al limpiar storage: ${error.message}`);
    }
  };

  const handleClearCache = async () => {
    setIsClearing(true);
    setMessage('');
    setMessageType('');

    try {
      const results = [];
      
      // Limpiar caches
      const cacheResult = await clearAllCaches();
      results.push(cacheResult);
      
      // Desregistrar service workers
      const swResult = await unregisterServiceWorkers();
      results.push(swResult);
      
      // Limpiar storage
      const storageResult = clearStorage();
      results.push(storageResult);

      setMessage(results.join('\n'));
      setMessageType('success');
      
      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
      setMessageType('error');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="cache-cleaner">
      <h3>🧹 Limpiador de Cache</h3>
      <p>Elimina todos los caches, service workers y datos de almacenamiento</p>
      
      <button 
        onClick={handleClearCache}
        disabled={isClearing}
        className={`clear-button ${isClearing ? 'clearing' : ''}`}
      >
        {isClearing ? 'Limpiando...' : 'Limpiar Cache'}
      </button>
      
      {message && (
        <div className={`message ${messageType}`}>
          <pre>{message}</pre>
        </div>
      )}
      
      <div className="instructions">
        <h4>Instrucciones:</h4>
        <ol>
          <li>Haz clic en "Limpiar Cache"</li>
          <li>Espera a que se complete la limpieza</li>
          <li>La página se recargará automáticamente</li>
        </ol>
      </div>
    </div>
  );
};

export default CacheCleaner; 