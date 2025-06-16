export const BLOG_CONFIG = {
  // Categorías del blog optimizadas para SEO
  categories: {
    gaming: {
      slug: 'gaming-vr',
      name: 'Gaming VR',
      description: 'Noticias, reseñas y guías sobre gaming en realidad virtual',
      keywords: ['gaming VR', 'juegos realidad virtual', 'reseñas VR', 'guías VR gaming'],
      priority: 1
    },
    equipment: {
      slug: 'equipamiento-vr',
      name: 'Equipamiento VR',
      description: 'Análisis y tutoriales sobre equipamiento de realidad virtual',
      keywords: ['KAT Walk', 'OWO vest', 'hardware VR', 'equipamiento gaming'],
      priority: 1
    },
    tutorials: {
      slug: 'tutoriales-vr',
      name: 'Tutoriales VR',
      description: 'Guías paso a paso para mejorar tu experiencia en VR',
      keywords: ['tutoriales VR', 'guías realidad virtual', 'tips VR', 'consejos gaming'],
      priority: 0.9
    },
    events: {
      slug: 'eventos-vr',
      name: 'Eventos VR',
      description: 'Torneos, competiciones y eventos de realidad virtual',
      keywords: ['torneos VR', 'eventos gaming', 'competiciones VR', 'esports VR'],
      priority: 0.8
    }
  },

  // Estructura de URLs para el blog
  urls: {
    base: '/blog',
    category: '/blog/categoria',
    tag: '/blog/etiqueta',
    author: '/blog/autor',
    search: '/blog/buscar'
  },

  // Configuración de metadatos para el blog
  metadata: {
    title: {
      base: 'Blog de Gaming VR | Nexus Gaming eSport',
      category: '{{category}} - Blog de Gaming VR | Nexus Gaming',
      post: '{{title}} | Blog de Gaming VR'
    },
    description: {
      base: 'Descubre las últimas noticias, guías y tutoriales sobre gaming en realidad virtual. Mantente al día con Nexus Gaming eSport.',
      category: 'Explora nuestros artículos sobre {{category}}. {{description}}',
      post: '{{excerpt}}'
    }
  },

  // Estructura de artículos para SEO
  articleStructure: {
    // Elementos requeridos para cada artículo
    required: [
      'title',
      'slug',
      'excerpt',
      'content',
      'category',
      'author',
      'publishDate',
      'readingTime',
      'featuredImage'
    ],
    // Elementos opcionales para mejorar SEO
    optional: [
      'tags',
      'relatedPosts',
      'schemaMarkup',
      'tableOfContents',
      'faqSection'
    ]
  },

  // Schema.org markup para artículos
  schemaMarkup: {
    article: {
      type: 'Article',
      properties: {
        headline: '{{title}}',
        description: '{{excerpt}}',
        image: '{{featuredImage}}',
        datePublished: '{{publishDate}}',
        dateModified: '{{lastModified}}',
        author: {
          type: 'Person',
          name: '{{authorName}}'
        },
        publisher: {
          type: 'Organization',
          name: 'Nexus Gaming eSport VR',
          logo: {
            type: 'ImageObject',
            url: '{{logoUrl}}'
          }
        }
      }
    }
  },

  // Configuración de paginación
  pagination: {
    postsPerPage: 9,
    maxPages: 5,
    prevText: 'Anterior',
    nextText: 'Siguiente'
  },

  // Configuración de búsqueda
  search: {
    minLength: 3,
    maxResults: 10,
    searchFields: [
      'title',
      'excerpt',
      'content',
      'tags',
      'category'
    ]
  },

  // Configuración de redes sociales
  socialSharing: {
    platforms: ['facebook', 'twitter', 'linkedin', 'whatsapp'],
    defaultImage: '/assets/blog/social-share-default.jpg',
    twitterHandle: '@NexusGamingVR'
  },

  // Configuración de comentarios
  comments: {
    enabled: true,
    provider: 'disqus',
    disqusShortname: 'nexusgaming',
    moderation: true
  },

  // Configuración de RSS
  rss: {
    enabled: true,
    title: 'Nexus Gaming eSport VR Blog',
    description: 'Las últimas noticias y guías sobre gaming en realidad virtual',
    language: 'es-ES',
    categories: true,
    author: true
  }
}; 