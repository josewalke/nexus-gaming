import React, { lazy, Suspense, useEffect } from 'react';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import ParallaxSection from './ParallaxSection/ParallaxSection';
import LazyComponent from './LazyComponent';
import SEOMetaTags from './SEO/SEOMetaTags';
import '../styles/Global.css';
import '../styles/Effects.css';

// Lazy load de componentes pesados con preloading inteligente
const VideoSection = lazy(() => import('./VideoSection/VideoSection'));
const EquipmentSection = lazy(() => import('./EquipmentSection/EquipmentSection'));
const MatchesSection = lazy(() => import('./MatchesSection/MatchesSection'));
const Footer = lazy(() => import('./Footer/Footer'));

// Componente de carga optimizado
const OptimizedLoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    color: '#00FFFF',
    fontSize: '16px',
    fontFamily: 'Orbitron',
    background: 'rgba(0, 255, 255, 0.05)',
    borderRadius: '8px',
    margin: '20px 0'
  }}>
    <div style={{
      width: '30px',
      height: '30px',
      border: '2px solid #00FFFF',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '15px'
    }}></div>
    Cargando experiencia...
  </div>
);

export default function NexusGamingHome({ lang, setLang }) {
  const currentPath = window.location.pathname;

  // Preload inteligente de componentes cuando el usuario hace scroll
  useEffect(() => {
    const preloadComponents = () => {
      // Preload VideoSection cuando el usuario está cerca
      const videoSection = document.getElementById('experience');
      if (videoSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Preload VideoSection
              import('./VideoSection/VideoSection');
              observer.disconnect();
            }
          });
        }, { rootMargin: '100px' });
        observer.observe(videoSection);
      }
    };

    // Ejecutar después de que la página se haya cargado
    if (document.readyState === 'complete') {
      preloadComponents();
    } else {
      window.addEventListener('load', preloadComponents);
      return () => window.removeEventListener('load', preloadComponents);
    }
  }, []);

  return (
    <div className="nexus-container">
      <SEOMetaTags lang={lang} currentPath={currentPath} />
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <ParallaxSection lang={lang} />
      
      {/* VideoSection con preloading inteligente */}
      <div id="experience">
        <Suspense fallback={<OptimizedLoadingSpinner />}>
          <VideoSection lang={lang} />
        </Suspense>
      </div>
      
      {/* MatchesSection */}
      <Suspense fallback={<OptimizedLoadingSpinner />}>
        <MatchesSection lang={lang} />
      </Suspense>
      
      {/* EquipmentSection */}
      <Suspense fallback={<OptimizedLoadingSpinner />}>
        <EquipmentSection lang={lang} />
      </Suspense>
      
      {/* Footer */}
      <Suspense fallback={<OptimizedLoadingSpinner />}>
        <Footer lang={lang} />
      </Suspense>
    </div>
  );
}
