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

// Hook para monitorear Core Web Vitals
export const useCoreWebVitals = () => {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });

  useEffect(() => {
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
        });
      });
      fcpObserver.observe({ entryTypes: ['first-contentful-paint'] });

      // TTFB (Time to First Byte)
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }));
      }

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
      };
    }
  }, []);

  return metrics;
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

// Hook para monitorear performance en tiempo real
export const usePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState({
    fps: 0,
    memory: null,
    connection: null,
    loadTime: null
  });

  useEffect(() => {
    let cleanupFunctions = [];

    // Medir FPS
    let frames = 0;
    let lastFpsUpdate = performance.now();
    
    function measureFPS(now) {
      frames++;
      if (now - lastFpsUpdate > 1000) {
        setPerformanceData(prev => ({ ...prev, fps: frames }));
        frames = 0;
        lastFpsUpdate = now;
      }
      requestAnimationFrame(measureFPS);
    }
    requestAnimationFrame(measureFPS);

    // Medir memoria (si está disponible)
    if ('memory' in performance) {
      const updateMemory = () => {
        setPerformanceData(prev => ({ 
          ...prev, 
          memory: {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit
          }
        }));
      };
      updateMemory();
      const memoryInterval = setInterval(updateMemory, 5000);
      cleanupFunctions.push(() => clearInterval(memoryInterval));
    }

    // Medir conexión
    if ('connection' in navigator && navigator.connection) {
      const updateConnection = () => {
        setPerformanceData(prev => ({ 
          ...prev, 
          connection: {
            type: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData
          }
        }));
      };
      updateConnection();
      navigator.connection.addEventListener('change', updateConnection);
      cleanupFunctions.push(() => {
        if ('connection' in navigator && navigator.connection) {
          navigator.connection.removeEventListener('change', updateConnection);
        }
      });
    }

    // Medir tiempo de carga
    if (performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd && timing.navigationStart ? 
        (timing.loadEventEnd - timing.navigationStart) : null;
      setPerformanceData(prev => ({ ...prev, loadTime }));
    }

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  return performanceData;
}; 