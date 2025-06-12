import React, { useRef } from 'react';
import translations from '../../translations';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxSection.css';

export default function ParallaxSection({ lang }) {
  const t = translations[lang];
  const ref = useRef(null);
  
  // Hook para obtener el progreso del scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transformar el scroll en movimiento parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  return (
    <section ref={ref} className="nexus-parallax-container">
      {/* Fondo con efecto parallax */}
      <motion.div
        className="parallax-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/assets/parallax-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y,
          opacity,
          zIndex: 1
        }}
      />

      {/* Overlay para mejorar legibilidad */}
      <div
        className="parallax-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 2
        }}
      />

      {/* Contenido */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="neon-text parallax-content"
        style={{ 
          color: '#FFFFFF',
          position: 'relative',
          zIndex: 3
        }}
      >
        {t.enterVr}
      </motion.h2>
    </section>
  );
} 