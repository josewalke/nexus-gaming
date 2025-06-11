import React from 'react';
import translations from '../../translations';
import OptimizedImage from '../OptimizedImage';
import './EquipmentSection.css';

export default function EquipmentSection({ lang }) {
  const t = translations[lang];

  return (
    <section id="equipment" className="nexus-section">
      <h2>{t.section1}</h2>
      <p>{t.section1Text}</p>

      <div className="equipment-block">
        <div className="equipment-image">
          <OptimizedImage 
            src="/assets/kat-vr.png" 
            alt={t.equipment.kat.title}
            loading="lazy"
          />
        </div>
        <div className="equipment-text">
          <h3>{t.equipment.kat.title}</h3>
          <p>{t.equipment.kat.text}</p>
        </div>
      </div>

      <div className="equipment-block reverse">
        <div className="equipment-image">
          <OptimizedImage 
            src="/assets/owo-vest.png" 
            alt={t.equipment.owo.title}
            loading="lazy"
          />
        </div>
        <div className="equipment-text">
          <h3>{t.equipment.owo.title}</h3>
          <p>{t.equipment.owo.text}</p>
        </div>
      </div>
    </section>
  );
} 