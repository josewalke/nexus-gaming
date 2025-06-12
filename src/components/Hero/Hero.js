import React from 'react';
import translations from '../../translations';
import { FloatingParticles } from '../Effects/ScrollEffects';
import { motion } from 'framer-motion';
import './Hero.css';

/**
 * Componente Hero - Sección principal de la página
 * Contiene el título, subtítulo y botón de llamada a la acción
 * Aplica efectos especiales: partículas flotantes
 */
export default function Hero({ lang }) {
  // Obtiene las traducciones según el idioma seleccionado
  const t = translations[lang];

  return (
    // Contenedor con partículas flotantes para crear ambiente futurista
    <FloatingParticles>
      <section className="nexus-hero">
        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            color: '#FFFFFF',
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          {t.title}
        </motion.h1>
        
        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            color: '#FFFFFF',
            fontSize: '1.5rem',
            marginBottom: '30px',
            textAlign: 'center'
          }}
        >
          {t.subtitle}
        </motion.p>
        
        {/* Botón de llamada a la acción con animaciones */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} // Estado inicial: invisible y pequeño
          animate={{ opacity: 1, scale: 1 }} // Animación de entrada
          transition={{ duration: 0.8, delay: 0.9 }} // Duración y delay
          whileHover={{ scale: 1.05 }} // Efecto hover: se agranda ligeramente
          whileTap={{ scale: 0.95 }} // Efecto al hacer clic: se encoge
        >
          {t.book}
        </motion.button>
      </section>
    </FloatingParticles>
  );
} 