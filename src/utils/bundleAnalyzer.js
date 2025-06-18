import { useState, useEffect } from 'react';

// Utilidad para análisis de bundle y optimización
export const BUNDLE_ANALYZER = {
  // Configuración de análisis
  config: {
    maxBundleSize: 500, // KB
    maxChunkSize: 200, // KB
    criticalThreshold: 100, // KB
    warningThreshold: 300 // KB
  },

  // Analizar tamaño de bundle
  analyzeBundleSize: (bundleStats) => {
    const analysis = {
      totalSize: 0,
      chunks: [],
      recommendations: [],
      score: 100
    };

    if (bundleStats && bundleStats.chunks) {
      bundleStats.chunks.forEach(chunk => {
        const sizeKB = chunk.size / 1024;
        analysis.totalSize += sizeKB;
        
        analysis.chunks.push({
          name: chunk.name,
          size: sizeKB,
          status: sizeKB > BUNDLE_ANALYZER.config.maxChunkSize ? 'warning' : 'good'
        });

        if (sizeKB > BUNDLE_ANALYZER.config.criticalThreshold) {
          analysis.recommendations.push({
            type: 'critical',
            message: `Chunk ${chunk.name} es muy grande (${sizeKB.toFixed(1)}KB). Considera dividirlo.`
          });
          analysis.score -= 20;
        } else if (sizeKB > BUNDLE_ANALYZER.config.warningThreshold) {
          analysis.recommendations.push({
            type: 'warning',
            message: `Chunk ${chunk.name} es grande (${sizeKB.toFixed(1)}KB). Considera optimizarlo.`
          });
          analysis.score -= 10;
        }
      });
    }

    if (analysis.totalSize > BUNDLE_ANALYZER.config.maxBundleSize) {
      analysis.recommendations.push({
        type: 'critical',
        message: `Bundle total muy grande (${analysis.totalSize.toFixed(1)}KB). Implementa más code splitting.`
      });
      analysis.score -= 30;
    }

    return analysis;
  },

  // Generar reporte de optimización
  generateOptimizationReport: () => {
    return {
      title: 'Reporte de Optimización de Bundle',
      sections: [
        {
          title: 'Code Splitting Implementado',
          items: [
            '✅ Lazy loading de componentes pesados',
            '✅ Suspense con fallbacks optimizados',
            '✅ Preloading inteligente con IntersectionObserver',
            '✅ Separación de componentes por funcionalidad'
          ]
        },
        {
          title: 'Optimizaciones Recomendadas',
          items: [
            '🔧 Implementar dynamic imports para librerías pesadas',
            '🔧 Optimizar imports de Framer Motion',
            '🔧 Considerar tree shaking para Three.js',
            '🔧 Implementar chunk naming para mejor cache'
          ]
        },
        {
          title: 'Métricas Objetivo',
          items: [
            '📊 Bundle inicial < 200KB',
            '📊 Chunks individuales < 100KB',
            '📊 Time to Interactive < 3s',
            '📊 First Contentful Paint < 1.5s'
          ]
        }
      ]
    };
  },

  // Detectar imports problemáticos
  detectProblematicImports: () => {
    const problematicImports = [
      {
        library: 'framer-motion',
        issue: 'Bundle grande, considerar lazy loading',
        solution: 'Importar solo componentes necesarios'
      },
      {
        library: 'three',
        issue: 'Librería 3D pesada',
        solution: 'Implementar tree shaking o lazy loading'
      },
      {
        library: 'react-select',
        issue: 'Componente completo cargado',
        solution: 'Considerar alternativa más ligera'
      }
    ];

    return problematicImports;
  },

  // Optimizar imports
  optimizeImports: {
    framerMotion: () => {
      return {
        before: "import { motion, AnimatePresence } from 'framer-motion'",
        after: "import { motion } from 'framer-motion/dist/framer-motion'",
        benefit: 'Reducción de ~50KB en bundle'
      };
    },
    
    three: () => {
      return {
        before: "import * as THREE from 'three'",
        after: "import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'",
        benefit: 'Reducción de ~100KB en bundle'
      };
    }
  }
};

// Hook para monitorear carga de chunks
export const useChunkLoadingMonitor = () => {
  const [chunkStats, setChunkStats] = useState({
    loadedChunks: 0,
    totalChunks: 0,
    loadingTime: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    // Monitorear carga de chunks
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0];
      if (typeof url === 'string' && url.includes('static/js/')) {
        const chunkStart = performance.now();
        return originalFetch.apply(this, args).then(response => {
          const chunkEnd = performance.now();
          setChunkStats(prev => ({
            ...prev,
            loadedChunks: prev.loadedChunks + 1,
            loadingTime: chunkEnd - chunkStart
          }));
          return response;
        });
      }
      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return chunkStats;
}; 