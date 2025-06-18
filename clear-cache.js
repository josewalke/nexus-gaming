// Script para limpiar cache de service worker y otros caches
// Ejecuta este código en la consola del navegador (F12)

console.log('🧹 Iniciando limpieza de cache...');

// Función para limpiar todos los caches
async function clearAllCaches() {
  try {
    // Verificar si el navegador soporta Cache API
    if ('caches' in window) {
      // Obtener todas las claves de cache
      const cacheNames = await caches.keys();
      console.log('📋 Caches encontrados:', cacheNames);
      
      // Eliminar cada cache
      const deletePromises = cacheNames.map(cacheName => {
        console.log(`🗑️ Eliminando cache: ${cacheName}`);
        return caches.delete(cacheName);
      });
      
      await Promise.all(deletePromises);
      console.log('✅ Todos los caches han sido eliminados');
    } else {
      console.log('⚠️ Cache API no está disponible en este navegador');
    }
  } catch (error) {
    console.error('❌ Error al limpiar caches:', error);
  }
}

// Función para verificar y desregistrar service workers
async function unregisterServiceWorkers() {
  try {
    if ('serviceWorker' in navigator) {
      // Obtener todos los service workers registrados
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log('🔍 Service workers encontrados:', registrations.length);
      
      // Desregistrar cada service worker
      const unregisterPromises = registrations.map(registration => {
        console.log(`🗑️ Desregistrando service worker:`, registration);
        return registration.unregister();
      });
      
      await Promise.all(unregisterPromises);
      console.log('✅ Todos los service workers han sido desregistrados');
    } else {
      console.log('⚠️ Service Workers no están disponibles en este navegador');
    }
  } catch (error) {
    console.error('❌ Error al desregistrar service workers:', error);
  }
}

// Función para limpiar localStorage y sessionStorage
function clearStorage() {
  try {
    // Limpiar localStorage
    localStorage.clear();
    console.log('🗑️ localStorage limpiado');
    
    // Limpiar sessionStorage
    sessionStorage.clear();
    console.log('🗑️ sessionStorage limpiado');
  } catch (error) {
    console.error('❌ Error al limpiar storage:', error);
  }
}

// Función principal que ejecuta todo
async function clearEverything() {
  console.log('🚀 Iniciando limpieza completa...');
  
  await clearAllCaches();
  await unregisterServiceWorkers();
  clearStorage();
  
  console.log('🎉 ¡Limpieza completada!');
  console.log('💡 Recarga la página para aplicar los cambios');
}

// Ejecutar la limpieza
clearEverything(); 