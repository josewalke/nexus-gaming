import React from 'react';
import translations from '../../translations';
import './Hero.css';

export default function Hero({ lang }) {
  const t = translations[lang];

  return (
    <section className="nexus-hero">
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <button>{t.book}</button>
    </section>
  );
} 