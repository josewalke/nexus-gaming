import React from 'react';
import translations from '../../translations';
import { FloatingParticles } from '../Effects/ScrollEffects';
import { motion } from 'framer-motion';
import './EquipmentSection.css';

export default function EquipmentSection({ lang }) {
  const t = translations[lang];

  return (
    <FloatingParticles count={50}>
      <section id="equipment" className="nexus-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.section1}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t.section1Text}
        </motion.p>

        <motion.div 
          className="equipment-block"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="equipment-image">
            <img 
              src="/assets/kat-vr.png" 
              alt={t.equipment.kat.title}
              loading="lazy"
            />
          </div>
          <motion.div 
            className="equipment-text"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>{t.equipment.kat.title}</h3>
            <p>{t.equipment.kat.text}</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="equipment-block reverse"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="equipment-image">
            <img 
              src="/assets/owo-vest.png" 
              alt={t.equipment.owo.title}
              loading="lazy"
            />
          </div>
          <motion.div 
            className="equipment-text"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>{t.equipment.owo.title}</h3>
            <p>{t.equipment.owo.text}</p>
          </motion.div>
        </motion.div>
      </section>
    </FloatingParticles>
  );
} 