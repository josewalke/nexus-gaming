import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Efecto de partículas flotantes para el Hero
 * Crea partículas que flotan suavemente por la pantalla
 * Perfecto para crear ambiente futurista y tecnológico
 */
export const FloatingParticles = ({ children, count = 20 }) => {
  // Hook para detectar cuando el componente entra en el viewport
  const [ref, inView] = useInView({
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    triggerOnce: true // Solo se ejecuta una vez
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }} // Estado inicial: invisible
      animate={inView ? { opacity: 1 } : { opacity: 0 }} // Animación de aparición
      transition={{ duration: 1 }} // Duración de la transición
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Generamos partículas con propiedades aleatorias */}
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2, // Tamaño aleatorio entre 2-6px
            height: Math.random() * 4 + 2,
            background: `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.2})`, // Color cian con opacidad aleatoria
            borderRadius: '50%', // Forma circular
            left: `${Math.random() * 100}%`, // Posición horizontal aleatoria
            top: `${Math.random() * 100}%`, // Posición vertical aleatoria
          }}
          animate={{
            y: [0, -30, 0], // Movimiento vertical: sube y baja
            x: [0, Math.random() * 20 - 10, 0], // Movimiento horizontal aleatorio
            opacity: [0.2, 0.8, 0.2], // Cambio de opacidad
          }}
          transition={{
            duration: Math.random() * 3 + 2, // Duración aleatoria entre 2-5 segundos
            repeat: Infinity, // Se repite infinitamente
            ease: "easeInOut", // Tipo de animación suave
            delay: Math.random() * 2, // Delay aleatorio para que no todas empiecen juntas
          }}
        />
      ))}
      {children} {/* Renderiza el contenido hijo */}
    </motion.div>
  );
};

/**
 * Efecto de partículas de fuego para MatchesSection
 * Crea partículas que suben como llamas
 * Representa la competitividad y energía del gaming
 */
export const FireParticles = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Generamos 150 partículas de fuego para máxima densidad y cobertura */}
      {[...Array(150)].map((_, i) => (
        <motion.div
          key={i}
          className="fire-particle"
          style={{
            position: 'absolute',
            width: Math.random() * 12 + 2, // Tamaño aleatorio entre 2-14px
            height: Math.random() * 12 + 2,
            background: `radial-gradient(circle, 
              rgba(255, 0, 0, ${Math.random() * 0.9 + 0.1}) 0%, 
              rgba(255, 0, 0, ${Math.random() * 0.8 + 0.2}) 30%, 
              rgba(200, 0, 0, ${Math.random() * 0.7 + 0.3}) 60%,
              rgba(150, 0, 0, ${Math.random() * 0.5 + 0.2}) 80%,
              transparent 100%)`, // Gradiente completamente rojo
            borderRadius: '50%',
            left: `${Math.random() * 140 - 20}%`, // Distribución más amplia (-20% a 120%)
            bottom: '0%', // Todas empiezan desde abajo
            boxShadow: `0 0 ${Math.random() * 10 + 4}px rgb(255, 0, 0)`, // Brillo de fuego rojo más intenso
            zIndex: 2, // Por encima del gradiente
          }}
          animate={{
            y: [0, -300], // Suben más (300px)
            x: [0, Math.random() * 120 - 60], // Movimiento horizontal mucho más amplio (±60px)
            scale: [1, 0.1], // Se encogen más para simular distancia
            opacity: [1, 0], // Se desvanecen
          }}
          transition={{
            duration: Math.random() * 5 + 3, // Duración aleatoria entre 3-8 segundos
            repeat: Infinity, // Se repite infinitamente
            ease: "easeOut", // Animación que se desacelera
            delay: Math.random() * 6, // Delay aleatorio más amplio
          }}
        />
      ))}
      {children}
    </motion.div>
  );
};

/**
 * Efecto de scroll parallax
 * Crea un efecto de profundidad al hacer scroll
 * Los elementos se mueven a diferentes velocidades
 */
export const ParallaxScroll = ({ children, speed = 0.5 }) => {
  const { scrollYProgress } = useScroll(); // Hook para obtener el progreso del scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]); // Transforma el scroll en movimiento
  const springY = useSpring(y, { stiffness: 100, damping: 30 }); // Aplica física de resorte

  return (
    <motion.div style={{ y: springY }}>
      {children}
    </motion.div>
  );
};

 