export const ANALYTICS_CONFIG = {
  // Configuración de Google Analytics
  googleAnalytics: {
    measurementId: 'G-XXXXXXXXXX', // Reemplazar con tu ID de Google Analytics
    events: {
      // Eventos personalizados
      pageView: 'page_view',
      equipmentView: 'equipment_view',
      matchesView: 'matches_view',
      videoPlay: 'video_play',
      bookingClick: 'booking_click',
      languageSwitch: 'language_switch'
    },
    // Dimensiones personalizadas
    customDimensions: {
      userType: 'dimension1',
      equipmentInterest: 'dimension2',
      matchPreference: 'dimension3'
    }
  },

  // Configuración de Facebook Pixel
  facebookPixel: {
    pixelId: 'XXXXXXXXXXXXX', // Reemplazar con tu ID de Facebook Pixel
    events: {
      pageView: 'PageView',
      equipmentView: 'ViewContent',
      matchesView: 'ViewContent',
      bookingClick: 'InitiateCheckout',
      completeBooking: 'Purchase'
    }
  },

  // Configuración de Hotjar
  hotjar: {
    hjid: 'XXXXXXXX', // Reemplazar con tu ID de Hotjar
    hjsv: '6',
    settings: {
      heatmaps: true,
      recordings: true,
      feedback: true
    }
  },

  // Métricas de rendimiento a monitorear
  performanceMetrics: {
    // Core Web Vitals
    lcp: {
      threshold: 2500, // 2.5 segundos
      weight: 0.25
    },
    fid: {
      threshold: 100, // 100 milisegundos
      weight: 0.25
    },
    cls: {
      threshold: 0.1,
      weight: 0.25
    },
    // Métricas adicionales
    ttfb: {
      threshold: 800, // 800 milisegundos
      weight: 0.15
    },
    fcp: {
      threshold: 1800, // 1.8 segundos
      weight: 0.10
    }
  },

  // Configuración de eventos de usuario
  userEvents: {
    // Interacciones con el contenido
    content: {
      videoPlay: {
        name: 'video_play',
        category: 'content',
        action: 'play'
      },
      equipmentHover: {
        name: 'equipment_hover',
        category: 'content',
        action: 'hover'
      },
      matchClick: {
        name: 'match_click',
        category: 'content',
        action: 'click'
      }
    },
    // Interacciones de navegación
    navigation: {
      menuClick: {
        name: 'menu_click',
        category: 'navigation',
        action: 'click'
      },
      scrollDepth: {
        name: 'scroll_depth',
        category: 'navigation',
        action: 'scroll',
        thresholds: [25, 50, 75, 100]
      }
    },
    // Interacciones de conversión
    conversion: {
      bookingStart: {
        name: 'booking_start',
        category: 'conversion',
        action: 'start'
      },
      bookingComplete: {
        name: 'booking_complete',
        category: 'conversion',
        action: 'complete'
      }
    }
  }
}; 