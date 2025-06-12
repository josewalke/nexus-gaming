import React, { useState, lazy, useEffect } from 'react';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import ParallaxSection from './ParallaxSection/ParallaxSection';
import LazyComponent from './LazyComponent';
import '../styles/Global.css';
import '../styles/Effects.css';

// Lazy load de componentes pesados
const VideoSection = lazy(() => import('./VideoSection/VideoSection'));
const EquipmentSection = lazy(() => import('./EquipmentSection/EquipmentSection'));
const MatchesSection = lazy(() => import('./MatchesSection/MatchesSection'));
const Footer = lazy(() => import('./Footer/Footer'));

export default function NexusGamingHome() {
  // Obtener idioma guardado o usar inglés por defecto
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('nexus-language');
    console.log('🌐 Idioma cargado desde localStorage:', savedLang || 'en (por defecto)');
    return savedLang || 'en';
  });

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('nexus-language', lang);
    console.log('💾 Idioma guardado en localStorage:', lang);
  }, [lang]);

  return (
    <div className="nexus-container">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <ParallaxSection lang={lang} />
      
      <LazyComponent>
        <VideoSection lang={lang} />
      </LazyComponent>
      
      <LazyComponent>
        <MatchesSection lang={lang} />
      </LazyComponent>
      
      <LazyComponent>
        <EquipmentSection lang={lang} />
      </LazyComponent>
      
      <LazyComponent>
        <Footer lang={lang} />
      </LazyComponent>
    </div>
  );
}
