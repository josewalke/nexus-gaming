import React from 'react';
import { Helmet } from 'react-helmet';
import translations from '../../translations';

export default function SEOMetaTags({ lang, currentPath }) {
  // const t = translations[lang]; // Eliminado porque no se usa
  
  // Definir títulos y descripciones específicas para cada ruta
  const pageMetadata = {
    '/': {
      title: 'Nexus Gaming eSport VR - Tu Realidad Comienza en el Nexus',
      description: 'Vive la realidad virtual como nunca antes. Centro de gaming VR con KAT Walk y OWO vest. Experiencias inmersivas y partidas PvP en vivo.',
      keywords: 'VR gaming, realidad virtual, KAT Walk, OWO vest, gaming center, PvP VR, experiencia inmersiva',
      ogImage: '/assets/og-image.jpg'
    },
    '/equipment': {
      title: 'Equipamiento VR Premium - Nexus Gaming eSport',
      description: 'Descubre nuestro equipamiento VR de última generación: KAT Walk Core 2+ y chaleco háptico OWO. Movimiento completo y sensaciones realistas.',
      keywords: 'KAT Walk VR, OWO vest, equipamiento VR, movimiento VR, háptico gaming',
      ogImage: '/assets/equipment-og.jpg'
    },
    '/matches': {
      title: 'Partidas PvP VR - Nexus Gaming eSport',
      description: 'Desafía a tus amigos en partidas PvP inmersivas. Experiencia competitiva en realidad virtual con el mejor equipamiento.',
      keywords: 'PvP VR, partidas VR, gaming competitivo, torneos VR, realidad virtual',
      ogImage: '/assets/matches-og.jpg'
    }
  };

  // Obtener metadata para la ruta actual o usar la página principal por defecto
  const metadata = pageMetadata[currentPath] || pageMetadata['/'];

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://nexusgaming.es${currentPath}`} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://nexusgaming.es${currentPath}`} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.ogImage} />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Nexus Gaming eSport VR",
          "image": metadata.ogImage,
          "description": metadata.description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Tu dirección aquí",
            "addressLocality": "Tu ciudad",
            "postalCode": "Tu código postal",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "Tu latitud",
            "longitude": "Tu longitud"
          },
          "url": "https://nexusgaming.es",
          "telephone": "Tu teléfono",
          "priceRange": "€€",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            "opens": "10:00",
            "closes": "22:00"
          }
        })}
      </script>
    </Helmet>
  );
} 