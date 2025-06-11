// Configuración de videos para diferentes dispositivos y calidades
export const VIDEO_CONFIG = {
  // Configuración de calidades
  qualities: {
    low: {
      width: 640,
      height: 360,
      bitrate: '500k',
      format: 'mp4',
      codec: 'avc1.42E01E'
    },
    mobile: {
      width: 854,
      height: 480,
      bitrate: '800k',
      format: 'mp4',
      codec: 'avc1.42E01E'
    },
    tablet: {
      width: 1280,
      height: 720,
      bitrate: '1.5M',
      format: 'mp4',
      codec: 'avc1.42E01E'
    },
    desktop: {
      width: 1920,
      height: 1080,
      bitrate: '3M',
      format: 'mp4',
      codec: 'avc1.42E01E'
    },
    hd: {
      width: 2560,
      height: 1440,
      bitrate: '5M',
      format: 'mp4',
      codec: 'avc1.42E01E'
    }
  },

  // Configuración de formatos soportados
  formats: {
    mp4: {
      mimeType: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      extension: '.mp4'
    },
    webm: {
      mimeType: 'video/webm; codecs="vp8, vorbis"',
      extension: '.webm'
    },
    ogv: {
      mimeType: 'video/ogg; codecs="theora, vorbis"',
      extension: '.ogv'
    }
  },

  // Configuración de autoplay
  autoplay: {
    desktop: true,
    mobile: false, // Requiere interacción del usuario
    tablet: false
  },

  // Configuración de preload
  preload: {
    desktop: 'metadata',
    mobile: 'none', // Ahorrar datos
    tablet: 'metadata'
  },

  // Configuración de poster
  poster: {
    enabled: true,
    path: '/assets/video-poster.jpg',
    fallback: '/assets/video-poster-fallback.jpg'
  }
};

// Función para detectar el mejor formato de video
export const getBestVideoFormat = () => {
  const video = document.createElement('video');
  
  // Probar formatos en orden de preferencia
  const formats = ['mp4', 'webm', 'ogv'];
  
  for (const format of formats) {
    const canPlay = video.canPlayType(VIDEO_CONFIG.formats[format].mimeType);
    if (canPlay === 'probably' || canPlay === 'maybe') {
      return format;
    }
  }
  
  return 'mp4'; // Fallback por defecto
};

// Función para seleccionar la calidad de video según el dispositivo
export const selectVideoQuality = (deviceType, connectionType, pixelRatio = 1) => {
  const isSlowConnection = connectionType === 'slow-2g' || 
                          connectionType === '2g' || 
                          connectionType === '3g';
  
  const isHighDPI = pixelRatio >= 2;
  
  switch (deviceType) {
    case 'mobile':
      if (isSlowConnection) return 'low';
      return 'mobile';
      
    case 'tablet':
      if (isSlowConnection) return 'mobile';
      return 'tablet';
      
    case 'desktop':
      if (isHighDPI) return 'hd';
      return 'desktop';
      
    default:
      return 'desktop';
  }
};

// Función para generar la URL del video
export const getVideoUrl = (quality, format = 'mp4') => {
  const basePath = '/assets/experience-video';
  const extension = VIDEO_CONFIG.formats[format]?.extension || '.mp4';
  
  if (quality === 'desktop') {
    return `${basePath}${extension}`;
  }
  
  return `${basePath}-${quality}${extension}`;
};

// Función para verificar si el video se puede reproducir
export const canPlayVideo = (format = 'mp4') => {
  const video = document.createElement('video');
  const mimeType = VIDEO_CONFIG.formats[format]?.mimeType;
  
  if (!mimeType) return false;
  
  const canPlay = video.canPlayType(mimeType);
  return canPlay === 'probably' || canPlay === 'maybe';
};

// Función para obtener información de conexión
export const getConnectionInfo = () => {
  const connection = navigator.connection || 
                    navigator.mozConnection || 
                    navigator.webkitConnection;
  
  if (!connection) {
    return {
      effectiveType: 'unknown',
      downlink: null,
      rtt: null
    };
  }
  
  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || null,
    rtt: connection.rtt || null
  };
};

// Función para verificar si el autoplay está permitido
export const canAutoplay = (deviceType) => {
  // En móviles, el autoplay generalmente no está permitido
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return false;
  }
  
  // En desktop, intentar reproducir un video silencioso para verificar
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  
  return new Promise((resolve) => {
    video.addEventListener('canplay', () => {
      video.play()
        .then(() => {
          video.pause();
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
    
    video.addEventListener('error', () => {
      resolve(false);
    });
    
    // Timeout después de 1 segundo
    setTimeout(() => {
      resolve(false);
    }, 1000);
  });
};

// Configuración de fallbacks
export const VIDEO_FALLBACKS = {
  // Si el video no se puede reproducir, mostrar imagen
  image: '/assets/video-poster.jpg',
  
  // Si la imagen no carga, mostrar color de fondo
  backgroundColor: '#000000',
  
  // Mensaje de error
  errorMessage: 'Video not supported on this device'
}; 