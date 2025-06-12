import React, { useRef, useEffect } from 'react';
import translations from '../../translations';
import { useResponsive } from '../../hooks/useResponsive';
import { WaveEffect, TypewriterText } from '../Effects/ScrollEffects';
import { motion } from 'framer-motion';
import './VideoSection.css';

/**
 * Componente VideoSection - Sección de experiencia VR
 * Muestra un video de fondo con contenido superpuesto
 * Aplica efectos especiales: ondas de energía y texto tipo máquina de escribir
 * El video se pausa automáticamente cuando no está visible
 */
export default function VideoSection({ lang }) {
  // Obtiene las traducciones según el idioma seleccionado
  const t = translations[lang];
  // Hook para detectar si el dispositivo es móvil
  const { isMobile } = useResponsive();
  // Referencia al elemento de video para controlarlo
  const videoRef = useRef(null);
  // Referencia al contenedor de la sección
  const sectionRef = useRef(null);

  // Efecto para manejar la reproducción del video y pausarlo cuando no está visible
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Función para intentar reproducir el video automáticamente
    const playVideo = async () => {
      try {
        await video.play();
        console.log('✅ Video reproduciéndose correctamente');
      } catch (error) {
        console.warn('⚠️ No se pudo autoplay:', error);
        // En móviles, esperar interacción del usuario para reproducir
        if (isMobile) {
          const handleUserInteraction = () => {
            video.play().catch(console.warn);
            // Remover los event listeners después de la primera interacción
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          // Agregar listeners para detectar la primera interacción del usuario
          document.addEventListener('touchstart', handleUserInteraction);
          document.addEventListener('click', handleUserInteraction);
        }
      }
    };

    // Configurar Intersection Observer para pausar/reproducir el video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La sección está visible, reproducir el video
            if (video.paused) {
              playVideo();
            }
          } else {
            // La sección no está visible, pausar el video
            if (!video.paused) {
              video.pause();
              console.log('⏸️ Video pausado (no visible)');
            }
          }
        });
      },
      {
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: '0px 0px -10% 0px' // Margen adicional para mejor detección
      }
    );

    // Observar la sección
    observer.observe(section);

    // Intentar reproducir el video inicialmente
    playVideo();

    // Event listeners para debugging y monitoreo del video
    video.addEventListener('loadstart', () => console.log('🎬 Video empezando a cargar'));
    video.addEventListener('canplay', () => console.log('🎬 Video listo para reproducir'));
    video.addEventListener('play', () => console.log('🎬 Video reproduciéndose'));
    video.addEventListener('pause', () => console.log('⏸️ Video pausado'));
    video.addEventListener('error', (e) => console.error('❌ Error en video:', e));

    // Cleanup: remover event listeners y observer al desmontar el componente
    return () => {
      observer.disconnect();
      video.removeEventListener('loadstart', () => {});
      video.removeEventListener('canplay', () => {});
      video.removeEventListener('play', () => {});
      video.removeEventListener('pause', () => {});
      video.removeEventListener('error', () => {});
    };
  }, [isMobile]); // Se ejecuta cuando cambia el estado de móvil

  return (
    // Contenedor con ondas de energía para crear ambiente tecnológico
    <WaveEffect>
      <section 
        ref={sectionRef}
        id="experience" 
        className="nexus-section nexus-video-section"
      >
        {/* Video de fondo con configuración optimizada */}
        <video
          ref={videoRef}
          className="nexus-video-bg"
          src="/assets/experience-video.mp4"
          autoPlay // Reproducción automática
          muted // Sin sonido (requerido para autoplay)
          loop // Se repite infinitamente
          playsInline // Reproduce inline en móviles
          preload="auto" // Precarga el video
          controls={false} // Sin controles de reproducción
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Cubre todo el contenedor
            zIndex: 1 // Se mantiene detrás del contenido
          }}
        />
        
        {/* Contenido superpuesto sobre el video */}
        <div className="nexus-video-content">
          {/* Título con animación de entrada */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }} // Estado inicial: invisible y desplazado
            whileInView={{ opacity: 1, y: 0 }} // Animación cuando entra en viewport
            transition={{ duration: 0.8 }} // Duración de la animación
            viewport={{ once: true }} // Solo se ejecuta una vez
          >
            {t.nav[0]}
          </motion.h2>
          
          {/* Texto con efecto de máquina de escribir */}
          <TypewriterText delay={0.3}>
            <p>Discover our unique immersive VR worlds and premium facilities.</p>
          </TypewriterText>
        </div>
      </section>
    </WaveEffect>
  );
} 