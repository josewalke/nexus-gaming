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