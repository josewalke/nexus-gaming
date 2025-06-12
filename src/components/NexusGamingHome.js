import React, { useState, lazy } from 'react';
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
  const [lang, setLang] = useState('en');

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
