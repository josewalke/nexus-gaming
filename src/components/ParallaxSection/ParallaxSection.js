import React from 'react';
import translations from '../../translations';
import './ParallaxSection.css';

export default function ParallaxSection({ lang }) {
  const t = translations[lang];

  return (
    <section className="nexus-parallax">
      <h2>{t.enterVr}</h2>
    </section>
  );
} 