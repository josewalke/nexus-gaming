/**
 * Servicio para enviar métricas de performance a Google Analytics
 * Permite el seguimiento de Core Web Vitals en producción
 */

// Función para enviar métricas a Google Analytics
export const sendPerformanceMetrics = (metrics) => {
  // Verificar si Google Analytics está disponible
  if (typeof window !== 'undefined' && window.gtag) {
    // Enviar LCP
    if (metrics.lcp) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'LCP',
        value: Math.round(metrics.lcp),
        non_interaction: true
      });
    }

    // Enviar FID
    if (metrics.fid) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'FID',
        value: Math.round(metrics.fid),
        non_interaction: true
      });
    }

    // Enviar CLS
    if (metrics.cls) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'CLS',
        value: Math.round(metrics.cls * 1000), // Convertir a milisegundos para GA
        non_interaction: true
      });
    }

    // Enviar FCP
    if (metrics.fcp) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'FCP',
        value: Math.round(metrics.fcp),
        non_interaction: true
      });
    }

    // Enviar TTFB
    if (metrics.ttfb) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'TTFB',
        value: Math.round(metrics.ttfb),
        non_interaction: true
      });
    }
  }
};

// Función para enviar score de performance
export const sendPerformanceScore = (score) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_score', {
      event_category: 'Performance',
      event_label: 'Overall Score',
      value: score,
      non_interaction: true
    });
  }
};

// Función para enviar métricas de errores de performance
export const sendPerformanceError = (error, metric) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_error', {
      event_category: 'Performance',
      event_label: metric,
      value: 1,
      non_interaction: true,
      custom_parameter: error.message
    });
  }
};

// Función para inicializar el tracking de performance
export const initializePerformanceTracking = () => {
  // Verificar si estamos en producción
  if (process.env.NODE_ENV === 'production') {
    // Configurar observadores de performance para envío automático
    if ('PerformanceObserver' in window) {
      // Observer para LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        sendPerformanceMetrics({ lcp: lastEntry.startTime });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observer para FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fidEntry = entries[0];
        sendPerformanceMetrics({ fid: fidEntry.processingStart - fidEntry.startTime });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observer para CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Enviar CLS después de 5 segundos
      setTimeout(() => {
        sendPerformanceMetrics({ cls: clsValue });
      }, 5000);
    }
  }
};

// Función para obtener métricas de performance del navegador
export const getBrowserPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0];
  if (!navigation) {
    return null;
  }

  return {
    // Tiempo total de carga
    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
    // Tiempo de DOM Content Loaded
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    // Tiempo de respuesta del servidor
    ttfb: navigation.responseStart - navigation.requestStart,
    // Tiempo de descarga
    downloadTime: navigation.responseEnd - navigation.responseStart,
    // Tamaño de la página
    pageSize: navigation.transferSize || 0
  };
};

// Función para enviar métricas del navegador
export const sendBrowserMetrics = () => {
  const metrics = getBrowserPerformanceMetrics();
  if (metrics && typeof window !== 'undefined' && window.gtag) {
    Object.entries(metrics).forEach(([key, value]) => {
      window.gtag('event', 'browser_metrics', {
        event_category: 'Browser Performance',
        event_label: key,
        value: Math.round(value),
        non_interaction: true
      });
    });
  }
};

// Función para monitorear cambios de conexión
export const monitorConnectionChanges = () => {
  if (typeof window !== 'undefined' && navigator.connection) {
    navigator.connection.addEventListener('change', () => {
      const connection = navigator.connection;
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'connection_change', {
          event_category: 'Network',
          event_label: connection.effectiveType || 'unknown',
          value: connection.downlink || 0,
          non_interaction: true,
          custom_parameters: {
            rtt: connection.rtt || 0,
            save_data: connection.saveData || false
          }
        });
      }
    });
  }
};

export default {
  sendPerformanceMetrics,
  sendPerformanceScore,
  sendPerformanceError,
  initializePerformanceTracking,
  getBrowserPerformanceMetrics,
  sendBrowserMetrics,
  monitorConnectionChanges
}; 