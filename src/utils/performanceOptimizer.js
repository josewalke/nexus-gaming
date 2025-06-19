/**
 * Optimizador de Performance para Nexus Gaming
 * Mejora Core Web Vitals y rendimiento general
 */

// Función para optimizar imágenes
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Lazy loading para imágenes no críticas
    if (!img.classList.contains('critical')) {
      img.loading = 'lazy';
    }
    
    // Optimizar imágenes críticas
    if (img.classList.contains('critical')) {
      img.fetchPriority = 'high';
      img.decoding = 'sync';
    }
    
    // Preload imágenes importantes
    if (img.dataset.preload === 'true') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    }
  });
};

// Función para optimizar fuentes
export const optimizeFonts = () => {
  // Preload fuentes críticas
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ];
  
  criticalFonts.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = fontUrl;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
};

// Función para optimizar CSS crítico
export const optimizeCriticalCSS = () => {
  // Inyectar CSS crítico inline
  const criticalCSS = `
    .nexus-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 100vh;
      padding: 120px 20px 80px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
      position: relative;
      overflow: hidden;
    }
    
    .nexus-hero h1 {
      font-size: clamp(3rem, 8vw, 6rem);
      font-weight: 300;
      color: #ffffff;
      margin-bottom: 20px;
      letter-spacing: -0.02em;
      line-height: 1.1;
      opacity: 1;
      transform: translateY(0);
      position: relative;
      z-index: 2;
    }
    
    .nexus-hero p {
      font-size: clamp(1.1rem, 2.5vw, 1.5rem);
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 40px;
      font-weight: 300;
      line-height: 1.6;
      max-width: 600px;
      opacity: 1;
      transform: translateY(0);
      position: relative;
      z-index: 2;
    }
    
    .nexus-hero button {
      padding: 18px 36px;
      font-size: 1.1rem;
      font-weight: 500;
      background: linear-gradient(135deg, #FF0033, #cc0026);
      border: none;
      border-radius: 50px;
      color: #ffffff;
      cursor: pointer;
      opacity: 1;
      transform: translateY(0);
      z-index: 2;
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};

// Función para optimizar JavaScript
export const optimizeJavaScript = () => {
  // Defer scripts no críticos
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    script.defer = true;
  });
  
  // Preload scripts críticos
  const criticalScripts = document.querySelectorAll('script[data-critical]');
  criticalScripts.forEach(script => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = script.src;
    document.head.appendChild(link);
  });
};

// Función para optimizar recursos
export const optimizeResources = () => {
  // Preload recursos críticos
  const criticalResources = [
    '/assets/kat-vr.png',
    '/assets/owo-vest.png',
    '/assets/experience-video.mp4'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.mp4')) {
      link.as = 'video';
      link.type = 'video/mp4';
    } else {
      link.as = 'image';
      link.type = 'image/png';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Función para optimizar animaciones
export const optimizeAnimations = () => {
  // Reducir animaciones en dispositivos de baja potencia
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    document.documentElement.style.setProperty('--animation-delay', '0.1s');
  }
  
  // Deshabilitar animaciones si el usuario prefiere movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
    document.documentElement.style.setProperty('--animation-delay', '0s');
  }
};

// Función para optimizar el DOM
export const optimizeDOM = () => {
  // Usar Intersection Observer para lazy loading
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });
    
    // Observar elementos que necesitan lazy loading
    document.querySelectorAll('[data-lazy]').forEach(el => {
      observer.observe(el);
    });
  }
};

// Función para optimizar el service worker
export const optimizeServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    // Registrar service worker con estrategia de cache optimizada
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    }).then(registration => {
      console.log('🚀 Service Worker registrado:', registration);
    }).catch(error => {
      console.log('❌ Error al registrar Service Worker:', error);
    });
  }
};

// Función principal de optimización
export const initializePerformanceOptimizations = () => {
  // Ejecutar optimizaciones críticas inmediatamente
  optimizeCriticalCSS();
  optimizeFonts();
  optimizeResources();
  optimizeAnimations();
  
  // Ejecutar optimizaciones no críticas después de la carga
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImages();
      optimizeJavaScript();
      optimizeDOM();
      optimizeServiceWorker();
    });
  } else {
    optimizeImages();
    optimizeJavaScript();
    optimizeDOM();
    optimizeServiceWorker();
  }
  
  // Optimizaciones adicionales en tiempo libre
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Limpiar recursos no utilizados
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            if (cacheName !== 'nexus-gaming-v1') {
              caches.delete(cacheName);
            }
          });
        });
      }
    });
  }
};

// Función para monitorear y optimizar en tiempo real
export const monitorAndOptimize = () => {
  let lastLCP = 0;
  let optimizationCount = 0;
  
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      // Si LCP empeora, aplicar optimizaciones adicionales
      if (lastEntry.startTime > lastLCP && lastLCP > 0 && optimizationCount < 3) {
        console.log('⚠️ LCP empeoró, aplicando optimizaciones adicionales...');
        
        // Reducir animaciones
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Preload más recursos críticos
        optimizeResources();
        
        optimizationCount++;
      }
      
      lastLCP = lastEntry.startTime;
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }
};

// Exportación nombrada en lugar de anónima
const performanceOptimizer = {
  optimizeImages,
  optimizeFonts,
  optimizeCriticalCSS,
  optimizeJavaScript,
  optimizeResources,
  optimizeAnimations,
  optimizeDOM,
  optimizeServiceWorker,
  initializePerformanceOptimizations,
  monitorAndOptimize
};

export default performanceOptimizer; 