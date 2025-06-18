import cacheManager from '../cacheManager';

// Mock de las APIs del navegador
const mockCaches = {
  keys: jest.fn(),
  delete: jest.fn()
};

const mockServiceWorker = {
  getRegistrations: jest.fn(),
  unregister: jest.fn()
};

const mockLocalStorage = {
  clear: jest.fn()
};

const mockSessionStorage = {
  clear: jest.fn()
};

// Mock global objects
global.caches = mockCaches;
global.navigator = {
  serviceWorker: mockServiceWorker
};
global.localStorage = mockLocalStorage;
global.sessionStorage = mockSessionStorage;

describe('CacheManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    
    // Reset global mocks
    mockCaches.keys.mockReset();
    mockCaches.delete.mockReset();
    mockServiceWorker.getRegistrations.mockReset();
    mockLocalStorage.clear.mockReset();
    mockSessionStorage.clear.mockReset();
  });

  describe('clearAllCaches', () => {
    test('limpia caches correctamente', async () => {
      const cacheNames = ['cache-1', 'cache-2', 'nexus-gaming-cache-v1'];
      mockCaches.keys.mockResolvedValue(cacheNames);
      mockCaches.delete.mockResolvedValue(true);

      await cacheManager.clearAllCaches();

      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockCaches.delete).toHaveBeenCalledTimes(3);
      expect(mockCaches.delete).toHaveBeenCalledWith('cache-1');
      expect(mockCaches.delete).toHaveBeenCalledWith('cache-2');
      expect(mockCaches.delete).toHaveBeenCalledWith('nexus-gaming-cache-v1');
    });

    test('maneja errores al limpiar caches', async () => {
      mockCaches.keys.mockRejectedValue(new Error('Cache error'));

      // No debe lanzar error
      await expect(cacheManager.clearAllCaches()).resolves.not.toThrow();
    });
  });

  describe('Service Worker Management', () => {
    test('desregistra service workers correctamente', async () => {
      const mockRegistrations = [
        { unregister: jest.fn().mockResolvedValue(true) },
        { unregister: jest.fn().mockResolvedValue(true) }
      ];
      mockServiceWorker.getRegistrations.mockResolvedValue(mockRegistrations);

      await cacheManager.clearAllCaches();

      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
      expect(mockRegistrations[0].unregister).toHaveBeenCalled();
      expect(mockRegistrations[1].unregister).toHaveBeenCalled();
    });

    test('maneja errores al desregistrar service workers', async () => {
      mockServiceWorker.getRegistrations.mockRejectedValue(new Error('SW error'));

      await expect(cacheManager.clearAllCaches()).resolves.not.toThrow();
    });
  });

  describe('Development Mode', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
      process.env.NODE_ENV = originalEnv;
    });

    test('limpia storage en modo desarrollo', async () => {
      process.env.NODE_ENV = 'development';
      
      // Mock cache names
      mockCaches.keys.mockResolvedValue(['test-cache']);
      mockCaches.delete.mockResolvedValue(true);

      await cacheManager.clearAllCaches();

      expect(mockLocalStorage.clear).toHaveBeenCalled();
      expect(mockSessionStorage.clear).toHaveBeenCalled();
    });

    test('no limpia storage en modo producción', async () => {
      process.env.NODE_ENV = 'production';
      
      // Mock cache names
      mockCaches.keys.mockResolvedValue(['test-cache']);
      mockCaches.delete.mockResolvedValue(true);

      await cacheManager.clearAllCaches();

      expect(mockLocalStorage.clear).not.toHaveBeenCalled();
      expect(mockSessionStorage.clear).not.toHaveBeenCalled();
    });
  });

  describe('forceClearCache', () => {
    test('fuerza limpieza de cache', async () => {
      mockCaches.keys.mockResolvedValue(['test-cache']);
      mockCaches.delete.mockResolvedValue(true);

      await cacheManager.forceClearCache();

      expect(mockCaches.keys).toHaveBeenCalled();
      expect(mockCaches.delete).toHaveBeenCalledWith('test-cache');
    });
  });

  describe('Error Handling', () => {
    test('maneja errores de APIs no disponibles', async () => {
      // Simular APIs no disponibles
      delete global.caches;
      delete global.navigator.serviceWorker;

      await expect(cacheManager.clearAllCaches()).resolves.not.toThrow();
    });

    test('maneja errores de localStorage/sessionStorage', async () => {
      mockLocalStorage.clear.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      // Mock cache names
      mockCaches.keys.mockResolvedValue(['test-cache']);
      mockCaches.delete.mockResolvedValue(true);

      await expect(cacheManager.clearAllCaches()).resolves.not.toThrow();
    });
  });

  describe('Performance', () => {
    test('ejecuta limpieza rápidamente', async () => {
      mockCaches.keys.mockResolvedValue(['test-cache']);
      mockCaches.delete.mockResolvedValue(true);
      
      const startTime = performance.now();
      
      await cacheManager.clearAllCaches();
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // La limpieza debe ejecutarse en menos de 100ms
      expect(executionTime).toBeLessThan(100);
    });
  });
}); 