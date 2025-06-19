/**
 * Configuración SEO centralizada para Nexus Gaming
 * Este archivo contiene todas las configuraciones SEO del sitio
 */

export const seoConfig = {
  // Configuración general del sitio
  site: {
    name: 'Nexus Gaming eSport VR',
    url: 'https://nexusgaming.es',
    description: 'Descubre Nexus Gaming eSport VR: La experiencia más avanzada en realidad virtual para gaming profesional.',
    keywords: 'realidad virtual, VR gaming, esports, KAT Walk, OWO Vest, gaming inmersivo, experiencia VR, gaming profesional',
    author: 'Nexus Gaming',
    language: 'es',
    defaultLocale: 'es_ES',
    supportedLocales: ['es', 'en'],
  },

  // Configuración de páginas específicas
  pages: {
    home: {
      title: 'Nexus Gaming eSport VR - Experiencia Inmersiva de Realidad Virtual | Gaming Profesional',
      description: 'Descubre Nexus Gaming eSport VR: La experiencia más avanzada en realidad virtual para gaming profesional. Equipamiento KAT Walk y OWO Vest para inmersión total. ¡Reserva tu experiencia ahora!',
      keywords: 'realidad virtual, VR gaming, esports, KAT Walk, OWO Vest, gaming inmersivo, experiencia VR, gaming profesional, realidad virtual gaming, Nexus Gaming',
      ogImage: '/assets/og-image.jpg',
      priority: 1.0,
    },
    equipment: {
      title: 'Equipamiento VR Premium - KAT Walk y OWO Vest | Nexus Gaming',
      description: 'Descubre nuestro equipamiento VR de última generación: KAT Walk Core 2+ para movimiento completo y chaleco háptico OWO para sensaciones realistas. Tecnología de vanguardia para gaming inmersivo.',
      keywords: 'KAT Walk VR, OWO vest, equipamiento VR, movimiento VR, háptico gaming, realidad virtual, gaming inmersivo, tecnología VR',
      ogImage: '/assets/equipment-og.jpg',
      priority: 0.9,
    },
    matches: {
      title: 'Partidas PvP VR Competitivas - Nexus Gaming eSport',
      description: 'Desafía a tus amigos en partidas PvP inmersivas con el mejor equipamiento VR. Experiencia competitiva en realidad virtual con torneos y rankings. ¡Únete a la competición!',
      keywords: 'PvP VR, partidas VR, gaming competitivo, torneos VR, realidad virtual, esports VR, competición gaming',
      ogImage: '/assets/matches-og.jpg',
      priority: 0.9,
    },
  },
};

// Función para obtener metadata de una página específica
export const getPageMetadata = (pageKey) => {
  return seoConfig.pages[pageKey] || seoConfig.pages.home;
};

export default seoConfig;