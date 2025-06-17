import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEOMetaTags({ lang, currentPath }) {
  // const t = translations[lang]; // Eliminado porque no se usa
  
  // Definir títulos y descripciones específicas para cada ruta
  const pageMetadata = {
    '/': {
      title: 'Nexus Gaming eSport VR - Experiencia Inmersiva de Realidad Virtual | Gaming Profesional',
      description: 'Descubre Nexus Gaming eSport VR: La experiencia más avanzada en realidad virtual para gaming profesional. Equipamiento KAT Walk y OWO Vest para inmersión total. ¡Reserva tu experiencia ahora!',
      keywords: 'realidad virtual, VR gaming, esports, KAT Walk, OWO Vest, gaming inmersivo, experiencia VR, gaming profesional, realidad virtual gaming, Nexus Gaming',
      ogImage: '/assets/og-image.jpg',
      type: 'website'
    },
    '/equipment': {
      title: 'Equipamiento VR Premium - KAT Walk y OWO Vest | Nexus Gaming',
      description: 'Descubre nuestro equipamiento VR de última generación: KAT Walk Core 2+ para movimiento completo y chaleco háptico OWO para sensaciones realistas. Tecnología de vanguardia para gaming inmersivo.',
      keywords: 'KAT Walk VR, OWO vest, equipamiento VR, movimiento VR, háptico gaming, realidad virtual, gaming inmersivo, tecnología VR',
      ogImage: '/assets/equipment-og.jpg',
      type: 'product'
    },
    '/matches': {
      title: 'Partidas PvP VR Competitivas - Nexus Gaming eSport',
      description: 'Desafía a tus amigos en partidas PvP inmersivas con el mejor equipamiento VR. Experiencia competitiva en realidad virtual con torneos y rankings. ¡Únete a la competición!',
      keywords: 'PvP VR, partidas VR, gaming competitivo, torneos VR, realidad virtual, esports VR, competición gaming',
      ogImage: '/assets/matches-og.jpg',
      type: 'event'
    }
  };

  // Obtener metadata para la ruta actual o usar la página principal por defecto
  const metadata = pageMetadata[currentPath] || pageMetadata['/'];

  // Datos estructurados base para la empresa
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nexus Gaming eSport VR",
    "alternateName": "Nexus Gaming",
    "image": [
      "https://nexusgaming.es/assets/og-image.jpg",
      "https://nexusgaming.es/assets/kat-vr.png",
      "https://nexusgaming.es/assets/owo-vest.png"
    ],
    "description": metadata.description,
    "url": "https://nexusgaming.es",
    "telephone": "+34-XXX-XXX-XXX",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, PayPal",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Ejemplo, 123",
      "addressLocality": "Madrid",
      "postalCode": "28001",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.4168",
      "longitude": "-3.7038"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/nexusgaming",
      "https://www.instagram.com/nexusgaming",
      "https://twitter.com/nexusgaming"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Experiencias VR",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Experiencia KAT Walk VR",
            "description": "Movimiento completo en realidad virtual con KAT Walk Core 2+"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Experiencia OWO Vest",
            "description": "Sensaciones hápticas realistas con chaleco OWO"
          }
        }
      ]
    }
  };

  // Datos estructurados específicos por página
  const getPageSpecificSchema = () => {
    switch (currentPath) {
      case '/equipment':
        return {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Equipamiento VR Premium",
          "description": "Catálogo de equipamiento VR de última generación",
          "itemListElement": [
            {
              "@type": "Product",
              "position": 1,
              "name": "KAT Walk Core 2+",
              "description": "Sistema de movimiento completo para realidad virtual",
              "image": "https://nexusgaming.es/assets/kat-vr.png",
              "brand": {
                "@type": "Brand",
                "name": "KAT VR"
              },
              "category": "Equipamiento VR"
            },
            {
              "@type": "Product",
              "position": 2,
              "name": "OWO Vest",
              "description": "Chaleco háptico para sensaciones realistas en VR",
              "image": "https://nexusgaming.es/assets/owo-vest.png",
              "brand": {
                "@type": "Brand",
                "name": "OWO"
              },
              "category": "Equipamiento VR"
            }
          ]
        };
      case '/matches':
        return {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Partidas PvP VR Competitivas",
          "description": "Competiciones de gaming en realidad virtual",
          "startDate": "2024-01-01T10:00:00",
          "endDate": "2024-12-31T22:00:00",
          "location": {
            "@type": "Place",
            "name": "Nexus Gaming eSport VR",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle Ejemplo, 123",
              "addressLocality": "Madrid",
              "postalCode": "28001",
              "addressCountry": "ES"
            }
          },
          "organizer": {
            "@type": "Organization",
            "name": "Nexus Gaming"
          },
          "offers": {
            "@type": "Offer",
            "price": "25",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        };
      default:
        return organizationSchema;
    }
  };

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="author" content="Nexus Gaming" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={`https://nexusgaming.es${currentPath}`} />
      
      {/* Idioma */}
      <html lang={lang || "es"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metadata.type} />
      <meta property="og:url" content={`https://nexusgaming.es${currentPath}`} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={`https://nexusgaming.es${metadata.ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Nexus Gaming" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://nexusgaming.es${currentPath}`} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={`https://nexusgaming.es${metadata.ogImage}`} />
      <meta name="twitter:site" content="@nexusgaming" />
      <meta name="twitter:creator" content="@nexusgaming" />
      
      {/* Datos estructurados */}
      <script type="application/ld+json">
        {JSON.stringify(getPageSpecificSchema())}
      </script>
      
      {/* Datos estructurados adicionales para la organización */}
      {currentPath === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
    </Helmet>
  );
} 