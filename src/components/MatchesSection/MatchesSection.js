import React from 'react';
import translations from '../../translations';
import { FireParticles } from '../Effects/ScrollEffects';
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
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t.section2Text}
        </motion.p>
      </section>
    </FireParticles>
  );
} 