// Configuración de performance
export const PERFORMANCE_CONFIG = {
  // Configuración de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
    delay: 100
  },

  // Configuración de imágenes
  images: {
    placeholder: '/assets/placeholder.jpg',
    formats: ['webp', 'jpg', 'png'],
    sizes: {
      mobile: 768,
      tablet: 1024,
      desktop: 1920
    }
  },

  // Configuración de video
  video: {
    preload: 'metadata',
    poster: '/assets/video-poster.jpg',
    mobileQuality: 'experience-video-mobile.mp4',
    desktopQuality: 'experience-video.mp4'
  },

  // Configuración de debounce/throttle
  timing: {
    debounce: 300,
    throttle: 100,
    scrollThrottle: 16 // 60fps
  },

  // Recursos para preload
  preloadResources: [
    {
      type: 'image',
      src: '/assets/kat-vr.png',
      priority: 'high'
    },
    {
      type: 'image', 
      src: '/assets/owo-vest.png',
      priority: 'medium'
    },
    {
      type: 'video',
      src: '/assets/experience-video.mp4',
      priority: 'low'
    }
  ],

  // Configuración de cache
  cache: {
    maxAge: 31536000, // 1 año
    staleWhileRevalidate: 86400 // 1 día
  },

  // Configuración de ahorro de datos
  dataSaving: {
    // Detectar preferencias de ahorro de datos
    detectDataSaving: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return connection ? connection.saveData : false;
    },

    // Configuración de calidad de recursos según ahorro de datos
    resourceQuality: {
      images: {
        high: {
          quality: 0.8,
          format: 'webp',
          maxWidth: 1920
        },
        low: {
          quality: 0.6,
          format: 'webp',
          maxWidth: 1280
        }
      },
      video: {
        high: {
          bitrate: '2000k',
          resolution: '1080p'
        },
        low: {
          bitrate: '1000k',
          resolution: '720p'
        }
      }
    },

    // Configuración de carga diferida
    lazyLoading: {
      images: true,
      videos: true,
      components: true,
      threshold: 0.1,
      rootMargin: '50px'
    },

    // Configuración de caché
    cache: {
      images: {
        maxAge: 86400, // 1 día
        staleWhileRevalidate: true
      },
      videos: {
        maxAge: 604800, // 1 semana
        staleWhileRevalidate: true
      }
    },

    // Configuración de compresión
    compression: {
      images: {
        enabled: true,
        formats: ['webp', 'avif'],
        quality: 0.8
      },
      text: {
        enabled: true,
        gzip: true,
        brotli: true
      }
    }
  },

  // Configuración de recursos según conexión
  connectionAware: {
    // Detectar tipo de conexión
    detectConnectionType: () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        return {
          type: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        };
      }
      return null;
    },

    // Ajustar calidad de recursos según conexión
    adjustResourceQuality: (connectionInfo) => {
      if (!connectionInfo) return 'high';
      
      if (connectionInfo.saveData) return 'low';
      
      if (connectionInfo.effectiveType === '4g' && connectionInfo.downlink >= 5) {
        return 'high';
      }
      
      return 'low';
    }
  }
};

// Función para obtener la calidad de imagen según el dispositivo
export const getImageQuality = (width) => {
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

// Función para generar srcset para imágenes responsivas
export const generateSrcSet = (baseSrc, sizes) => {
  return sizes.map(size => `${baseSrc}-${size}w ${size}w`).join(', ');
};

// Función para detectar soporte de formatos modernos
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Función para optimizar rutas de recursos
export const optimizeResourcePath = (path, quality = 'desktop') => {
  const isWebPSupported = supportsWebP();
  const extension = isWebPSupported ? 'webp' : 'jpg';
  
  if (path.includes('.')) {
    const basePath = path.split('.')[0];
    return `${basePath}-${quality}.${extension}`;
  }
  
  return `${path}-${quality}.${extension}`;
}; 