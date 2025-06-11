import { useEffect, useCallback, useState, useRef } from 'react';

// Hook para debounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para throttling
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback(() => {
    if (Date.now() - lastRun.current >= delay) {
      callback();
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Hook para detectar si el dispositivo es móvil
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Hook para preload de recursos
export const usePreload = (resources) => {
  useEffect(() => {
    resources.forEach(resource => {
      if (resource.type === 'image') {
        const img = new Image();
        img.src = resource.src;
      } else if (resource.type === 'video') {
        const video = document.createElement('video');
        video.src = resource.src;
        video.preload = 'metadata';
      }
    });
  }, [resources]);
};

// Hook para optimizar scroll
export const useOptimizedScroll = (callback, threshold = 100) => {
  const ticking = useRef(false);

  const updateScroll = useCallback(() => {
    callback();
    ticking.current = false;
  }, [callback]);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScroll);
      ticking.current = true;
    }
  }, [updateScroll]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
}; 