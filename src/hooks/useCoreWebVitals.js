import { useEffect, useState, useCallback } from 'react';
import { sendPerformanceMetrics, sendPerformanceScore } from '../utils/performanceAnalytics';

/**
 * Hook personalizado para monitorear Core Web Vitals
 * Proporciona medición en tiempo real de LCP, FID, CLS, FCP y TTFB
 */
export const useCoreWebVitals = () => {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loading: true
  });

  const [performanceScore, setPerformanceScore] = useState(0);

  // Función para calcular el score de performance
  const calculatePerformanceScore = useCallback((currentMetrics) => {
    const weights = {
      lcp: 0.25,
      fid: 0.25,
      cls: 0.25,
      ttfb: 0.15,
      fcp: 0.10
    };

    const thresholds = {
      lcp: 2500, // 2.5s
      fid: 100,  // 100ms
      cls: 0.1,  // 0.1
      ttfb: 800, // 800ms
      fcp: 1800  // 1.8s
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.keys(weights).forEach(metric => {
      if (currentMetrics[metric] !== null) {
        const value = currentMetrics[metric];
        const threshold = thresholds[metric];
        const weight = weights[metric];

        let score;
        if (metric === 'cls') {
          // CLS: menor es mejor
          score = Math.max(0, 1 - (value / threshold));
        } else {
          // LCP, FID, TTFB, FCP: menor es mejor
          score = Math.max(0, 1 - (value / threshold));
        }

        totalScore += score * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? Math.round(totalScore * 100) : 0;
  }, []);

  // Función para medir TTFB
  const measureTTFB = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        return navigation.responseStart - navigation.requestStart;
      }
    }
    return null;
  }, []);

  // Función para medir FCP
  const measureFCP = useCallback(() => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
            observer.disconnect();
          }
        });
        
        observer.observe({ entryTypes: ['paint'] });
        
        // Timeout de seguridad
        setTimeout(() => {
          observer.disconnect();
          resolve(null);
        }, 10000);
      } else {
        resolve(null);
      }
    });
  }, []);

  // Función para medir LCP
  const measureLCP = useCallback(() => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
          observer.disconnect();
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Timeout de seguridad
        setTimeout(() => {
          observer.disconnect();
          resolve(null);
        }, 10000);
      } else {
        resolve(null);
      }
    });
  }, []);

  // Función para medir FID
  const measureFID = useCallback(() => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fidEntry = entries[0];
          resolve(fidEntry.processingStart - fidEntry.startTime);
          observer.disconnect();
        });
        
        observer.observe({ entryTypes: ['first-input'] });
        
        // Timeout de seguridad
        setTimeout(() => {
          observer.disconnect();
          resolve(null);
        }, 10000);
      } else {
        resolve(null);
      }
    });
  }, []);

  // Función para medir CLS
  const measureCLS = useCallback(() => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Medir CLS después de 5 segundos
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 5000);
      } else {
        resolve(null);
      }
    });
  }, []);

  // Efecto principal para medir todas las métricas
  useEffect(() => {
    const measureAllMetrics = async () => {
      const newMetrics = { ...metrics };

      // Medir TTFB inmediatamente
      newMetrics.ttfb = measureTTFB();

      // Medir FCP
      newMetrics.fcp = await measureFCP();

      // Medir LCP
      newMetrics.lcp = await measureLCP();

      // Medir FID (después de la primera interacción)
      const handleFirstInteraction = async () => {
        newMetrics.fid = await measureFID();
        setMetrics({ ...newMetrics, loading: false });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);

      // Medir CLS
      newMetrics.cls = await measureCLS();

      setMetrics({ ...newMetrics, loading: false });
    };

    // Esperar a que la página esté completamente cargada
    if (document.readyState === 'complete') {
      measureAllMetrics();
    } else {
      window.addEventListener('load', measureAllMetrics);
      return () => window.removeEventListener('load', measureAllMetrics);
    }
  }, [measureTTFB, measureFCP, measureLCP, measureFID, measureCLS, metrics]);

  // Calcular score cuando cambian las métricas
  useEffect(() => {
    if (!metrics.loading) {
      const score = calculatePerformanceScore(metrics);
      setPerformanceScore(score);
      
      // Enviar métricas a Google Analytics en producción
      if (process.env.NODE_ENV === 'production') {
        sendPerformanceMetrics(metrics);
        sendPerformanceScore(score);
      }
    }
  }, [metrics, calculatePerformanceScore]);

  // Función para obtener el estado de cada métrica
  const getMetricStatus = useCallback((metric, value) => {
    if (value === null) return 'not-measured';
    
    const thresholds = {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      ttfb: { good: 800, needsImprovement: 1800 },
      fcp: { good: 1800, needsImprovement: 3000 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (metric === 'cls') {
      return value <= threshold.good ? 'good' : 
             value <= threshold.needsImprovement ? 'needs-improvement' : 'poor';
    } else {
      return value <= threshold.good ? 'good' : 
             value <= threshold.needsImprovement ? 'needs-improvement' : 'poor';
    }
  }, []);

  // Función para formatear valores
  const formatMetric = useCallback((metric, value) => {
    if (value === null) return 'N/A';
    
    switch (metric) {
      case 'lcp':
      case 'fcp':
      case 'ttfb':
        return `${Math.round(value)}ms`;
      case 'fid':
        return `${Math.round(value)}ms`;
      case 'cls':
        return value.toFixed(3);
      default:
        return value.toString();
    }
  }, []);

  return {
    metrics,
    performanceScore,
    getMetricStatus,
    formatMetric,
    isLoading: metrics.loading
  };
}; 