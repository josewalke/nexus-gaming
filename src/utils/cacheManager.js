/**
 * Gestor de Cache Simple para Nexus Gaming
 * Limpia automáticamente la cache para evitar problemas
 */

class CacheManager {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.init();
  }

  async init() {
    try {
      console.log('🧹 Inicializando limpieza automática de cache...');
      
      // Limpiar cache automáticamente al cargar
      await this.clearAllCaches();
      
      // En desarrollo, limpiar cache cada vez que se recarga
      if (this.isDevelopment) {
        this.setupDevelopmentMode();
      }
      
      console.log('✅ Cache limpiado automáticamente');
      
    } catch (error) {
      console.error('❌ Error limpiando cache:', error);
    }
  }

  async clearAllCaches() {
    try {
      // Limpiar caches de la API Cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        console.log('🗑️ Limpiando caches:', cacheNames);
        
        const deletePromises = cacheNames.map(cacheName => {
          return caches.delete(cacheName);
        });
        
        await Promise.all(deletePromises);
        console.log('✅ Caches eliminados');
      }

      // Desregistrar service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        console.log('🗑️ Desregistrando service workers:', registrations.length);
        
        const unregisterPromises = registrations.map(registration => {
          return registration.unregister();
        });
        
        await Promise.all(unregisterPromises);
        console.log('✅ Service workers desregistrados');
      }

      // Limpiar storage en desarrollo
      if (this.isDevelopment) {
        localStorage.clear();
        sessionStorage.clear();
        console.log('🗑️ Storage limpiado (desarrollo)');
      }

    } catch (error) {
      console.error('❌ Error limpiando caches:', error);
    }
  }

  setupDevelopmentMode() {
    // Limpiar cache automáticamente cada 30 segundos en desarrollo
    setInterval(async () => {
      console.log('🔄 Limpieza automática de cache (desarrollo)...');
      await this.clearAllCaches();
    }, 30000);
  }

  // Método público para forzar limpieza
  async forceClearCache() {
    console.log('🧹 Limpieza forzada de cache...');
    await this.clearAllCaches();
    console.log('✅ Cache limpiado');
  }
}

// Crear instancia global
const cacheManager = new CacheManager();

// Exportar para uso en otros archivos
export default cacheManager;

// También exportar método para uso directo
export const { forceClearCache } = cacheManager; 