import React from 'react';
import translations from '../../translations';
import { FireParticles, TypewriterText } from '../Effects/ScrollEffects';
import { motion } from 'framer-motion';
import './MatchesSection.css';

export default function MatchesSection({ lang }) {
  const t = translations[lang];

  return (
    <FireParticles>
      <section id="matches" className="nexus-section">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ color: '#FF0033' }}
        >
          {t.section2}
        </motion.h2>
        <TypewriterText delay={0.3}>
          <p>{t.section2Text}</p>
        </TypewriterText>
      </section>
    </FireParticles>
  );
} 