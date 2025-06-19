import React from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../../translations';
import { FloatingParticles } from '../Effects/ScrollEffects';
import { motion } from 'framer-motion';
import './Hero.css';

/**
 * Componente Hero - Sección principal de la página
 * Contiene el título, subtítulo y botón de llamada a la acción
 * Aplica efectos especiales: partículas flotantes
 * OPTIMIZADO para Core Web Vitals
 */
export default function Hero({ lang }) {
  // Obtiene las traducciones según el idioma seleccionado
  const t = translations[lang];
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/reservar');
  };

  return (
    // Contenedor con partículas flotantes para crear ambiente futurista
    <FloatingParticles>
      <section className="nexus-hero">
        {/* Título principal - OPTIMIZADO para LCP */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} // Reducido delay para mejor LCP
          style={{
            color: '#FFFFFF',
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            // Optimizaciones para LCP
            contain: 'layout style paint',
            willChange: 'transform, opacity'
          }}
          // Prioridad alta para LCP
          data-lcp-element="true"
        >
          {t.title}
        </motion.h1>
        
        {/* Subtítulo - Optimizado */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }} // Reducido delay
          style={{
            color: '#FFFFFF',
            fontSize: '1.5rem',
            marginBottom: '30px',
            textAlign: 'center',
            // Optimizaciones
            contain: 'layout style paint',
            willChange: 'transform, opacity'
          }}
        >
          {t.subtitle}
        </motion.p>
        
        {/* Botón de llamada a la acción con animaciones optimizadas */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }} // Reducido delay
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookingClick}
          style={{
            // Optimizaciones para performance
            contain: 'layout style paint',
            willChange: 'transform'
          }}
        >
          {t.book}
        </motion.button>
      </section>
    </FloatingParticles>
  );
} 