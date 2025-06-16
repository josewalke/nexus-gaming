export const IMAGE_CONFIG = {
  // Configuración de imágenes para SEO
  seo: {
    // Imágenes para Open Graph
    og: {
      main: {
        path: '/assets/seo/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexus Gaming eSport VR - Centro de Realidad Virtual'
      },
      equipment: {
        path: '/assets/seo/og-equipment.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipamiento VR Premium - KAT Walk y OWO Vest'
      },
      matches: {
        path: '/assets/seo/og-matches.jpg',
        width: 1200,
        height: 630,
        alt: 'Partidas PvP VR - Experiencia Competitiva'
      }
    },
    // Imágenes para Schema.org
    schema: {
      logo: {
        path: '/assets/seo/logo-schema.png',
        width: 600,
        height: 60,
        alt: 'Nexus Gaming eSport VR Logo'
      },
      location: {
        path: '/assets/seo/location-map.jpg',
        width: 800,
        height: 400,
        alt: 'Ubicación Nexus Gaming eSport VR'
      }
    }
  },

  // Configuración de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px'
  },

  // Formatos de imagen soportados
  formats: ['webp', 'avif', 'jpg'],
  
  // Tamaños de imagen responsivos
  sizes: {
    thumbnail: {
      width: 150,
      height: 150
    },
    medium: {
      width: 300,
      height: 300
    },
    large: {
      width: 600,
      height: 600
    },
    hero: {
      width: 1920,
      height: 1080
    }
  }
}; 