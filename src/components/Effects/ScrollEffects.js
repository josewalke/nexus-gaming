import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Efecto de partículas flotantes para el Hero
 * Crea 20 partículas que flotan suavemente por la pantalla
 * Perfecto para crear ambiente futurista y tecnológico
 */
export const FloatingParticles = ({ children }) => {
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
      {/* Generamos 20 partículas con propiedades aleatorias */}
      {[...Array(20)].map((_, i) => (
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
 * Efecto ASCII Text para el Hero
 * Simula caracteres ASCII que cambian gradualmente
 * Movimiento lento y elegante
 */
export const GlitchText = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Caracteres ASCII para el efecto
  const asciiChars = ['@', '#', '$', '%', '&', '*', '+', '=', '~', '!', '?', '^', '|', '/', '\\', '>', '<', ';', ':', '"', "'", '`', '-', '_', '.', ','];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }} // Estado inicial: invisible y desplazado
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} // Animación de entrada
      transition={{ duration: 1, delay }} // Duración suave
      style={{ position: 'relative' }}
    >
      {/* Efecto ASCII - Capa de caracteres que cambian lentamente */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: '#00FFFF', // Color cian para caracteres ASCII
          fontFamily: 'monospace', // Fuente monoespaciada
          fontSize: 'inherit',
          fontWeight: 'inherit',
          opacity: 0.4, // Semi-transparente
        }}
        animate={{
          opacity: [0, 0.5, 0.2, 0.4, 0], // Parpadeo sutil
        }}
        transition={{
          duration: 4, // Duración muy lenta
          repeat: Infinity,
          repeatDelay: 6, // Pausa larga entre repeticiones
          ease: "easeInOut",
        }}
      >
        {/* Generamos caracteres ASCII aleatorios */}
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return child.split('').map((char, index) => (
              <motion.span
                key={index}
                style={{
                  display: 'inline-block',
                  minWidth: '0.5em', // Ancho mínimo para evitar saltos
                }}
              >
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3, // Cambio lento de caracteres
                    repeat: Infinity,
                    repeatDelay: 8, // Pausa muy larga
                    ease: "easeInOut",
                    delay: index * 0.2, // Delay escalonado por carácter
                  }}
                >
                  {asciiChars[Math.floor(Math.random() * asciiChars.length)]}
                </motion.span>
                <motion.span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 8,
                    ease: "easeInOut",
                    delay: index * 0.2 + 1.5, // Delay opuesto
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ));
          }
          return child;
        })}
      </motion.div>

      {/* Efecto ASCII - Segunda capa con diferentes caracteres */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: '#FF00FF', // Color magenta para segunda capa
          fontFamily: 'monospace',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          opacity: 0.3, // Más transparente
        }}
        animate={{
          opacity: [0, 0.4, 0.1, 0.3, 0], // Parpadeo más sutil
        }}
        transition={{
          duration: 5, // Duración aún más lenta
          repeat: Infinity,
          repeatDelay: 10, // Pausa muy larga
          ease: "easeInOut",
          delay: 2, // Delay para desfase
        }}
      >
        {/* Segunda capa de caracteres ASCII */}
        {React.Children.map(children, (child) => {
          if (typeof child === 'string') {
            return child.split('').map((char, index) => (
              <motion.span
                key={index}
                style={{
                  display: 'inline-block',
                  minWidth: '0.5em',
                }}
              >
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4, // Cambio muy lento
                    repeat: Infinity,
                    repeatDelay: 12, // Pausa extremadamente larga
                    ease: "easeInOut",
                    delay: index * 0.3 + 3, // Delay escalonado por carácter
                  }}
                >
                  {asciiChars[Math.floor(Math.random() * asciiChars.length)]}
                </motion.span>
                <motion.span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 12,
                    ease: "easeInOut",
                    delay: index * 0.3 + 5, // Delay opuesto
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ));
          }
          return child;
        })}
      </motion.div>

      {/* Capa principal: Texto original */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        textShadow: '0 0 5px rgba(0, 255, 255, 0.3)' // Sombra sutil cian
      }}>
        {children}
      </div>
    </motion.div>
  );
};

/**
 * Efecto de ondas de energía para el VideoSection
 * Crea ondas concéntricas que se expanden desde el centro
 * Simula energía o señal de transmisión
 */
export const WaveEffect = ({ children }) => {
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
      {/* Generamos 3 ondas concéntricas */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="energy-wave"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            border: `2px solid rgba(0, 255, 255, ${0.3 - i * 0.1})`, // Opacidad decreciente
            borderRadius: '50%', // Forma circular
            transform: 'translate(-50%, -50%)', // Centrado perfecto
          }}
          animate={{
            scale: [0, 3], // Se expande desde 0 hasta 3 veces su tamaño
            opacity: [0.8, 0], // Se desvanece mientras se expande
          }}
          transition={{
            duration: 2, // Duración de la expansión
            repeat: Infinity, // Se repite infinitamente
            ease: "easeOut", // Animación que se desacelera
            delay: i * 0.5, // Cada onda empieza 0.5 segundos después
          }}
        />
      ))}
      {children}
    </motion.div>
  );
};

/**
 * Efecto de holograma para EquipmentSection
 * Crea un barrido de luz que simula un holograma
 * Perfecto para mostrar equipos tecnológicos
 */
export const HologramEffect = ({ children }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }} // Estado inicial: pequeño e invisible
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative' }}
    >
      {/* Capa de barrido holográfico */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
          borderRadius: 'inherit',
        }}
        animate={{
          x: ['-100%', '100%'], // Barrido de izquierda a derecha
        }}
        transition={{
          duration: 3, // Duración del barrido
          repeat: Infinity, // Se repite infinitamente
          ease: "linear", // Movimiento constante
        }}
      />
      {children}
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

/**
 * Efecto de máquina de escribir para texto
 * El texto aparece gradualmente como si se estuviera escribiendo
 * Crea suspense y atención al contenido
 */
export const TypewriterText = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        initial={{ width: 0 }} // Estado inicial: ancho 0 (texto oculto)
        animate={inView ? { width: '100%' } : { width: 0 }} // Animación: revela el texto
        transition={{ duration: 2, delay: delay + 0.5 }} // Duración de 2 segundos
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }} // Oculta el texto que se está revelando
      >
        {children}
      </motion.div>
    </motion.div>
  );
}; 