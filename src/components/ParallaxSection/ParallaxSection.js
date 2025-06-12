import React from 'react';
import translations from '../../translations';
import { motion } from 'framer-motion';
import './ParallaxSection.css';

export default function ParallaxSection({ lang }) {
  const t = translations[lang];

  return (
    <section className="nexus-parallax energy-particles">
      <motion.h2
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="neon-text"
        style={{ color: '#00FFFF' }}
      >
        {t.enterVr}
      </motion.h2>
    </section>
  );
} 