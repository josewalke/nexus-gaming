import React from 'react';
import translations from '../../translations';
import './MatchesSection.css';

export default function MatchesSection({ lang }) {
  const t = translations[lang];

  return (
    <section id="matches" className="nexus-section">
      <h2>{t.section2}</h2>
      <p>{t.section2Text}</p>
    </section>
  );
} 