import React, { useRef, useEffect, useState } from 'react';
import { PERFORMANCE_CONFIG } from '../../config/performance';
import translations from '../../translations';
import { useResponsive } from '../../hooks/useResponsive';

import { motion } from 'framer-motion';
import './VideoSection.css';

/**
 * Componente VideoSection - Sección de experiencia VR
 * Muestra un video de fondo con contenido superpuesto
 */
export default function VideoSection({ lang }) {
  // Obtiene las traducciones según el idioma seleccionado
  const t = translations[lang];
  // Hook para detectar si el dispositivo es móvil
  const { isMobile } = useResponsive();
  // Referencia al elemento de video para controlarlo
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoQuality, setVideoQuality] = useState('high');
  const [isDataSaving, setIsDataSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detectar preferencias de ahorro de datos y tipo de conexión
    const connectionInfo = PERFORMANCE_CONFIG.connectionAware.detectConnectionType();
    const dataSaving = PERFORMANCE_CONFIG.dataSaving.detectDataSaving();
    
    setIsDataSaving(dataSaving);
    
    // Ajustar calidad del video según conexión y preferencias
    const quality = PERFORMANCE_CONFIG.connectionAware.adjustResourceQuality(connectionInfo);
    setVideoQuality(quality);

    // Configurar observador de conexión
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', () => {
        const newConnectionInfo = PERFORMANCE_CONFIG.connectionAware.detectConnectionType();
        const newQuality = PERFORMANCE_CONFIG.connectionAware.adjustResourceQuality(newConnectionInfo);
        setVideoQuality(newQuality);
      });
    }
  }, []);

  // Intersection Observer para detectar cuando la sección es visible
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La sección es visible, reproducir el video
            setIsVisible(true);
            if (video.paused) {
              video.play().catch(() => {
                // Silenciar errores de autoplay
              });
            }
          } else {
            // La sección no es visible, pausar el video
            setIsVisible(false);
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.3, // El video se pausa cuando menos del 30% está visible
        rootMargin: '0px 0px -10% 0px' // Margen adicional para mejor detección
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Seleccionar fuente de video según calidad
  const getVideoSource = () => {
    const basePath = '/assets/experience-video';
    if (videoQuality === 'low' || isDataSaving) {
      return `${basePath}-low.mp4`; // Versión de menor calidad
    }
    return `${basePath}.mp4`; // Versión de alta calidad
  };

  // Efecto para manejar la reproducción del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Función para intentar reproducir el video automáticamente
    const playVideo = async () => {
      try {
        await video.play();
        // console.log('✅ Video reproduciéndose correctamente');
      } catch (error) {
        // console.warn('⚠️ No se pudo autoplay:', error);
        
        // En móviles, intentar reproducir después de la primera interacción
        if (isMobile) {
          const handleUserInteraction = () => {
            video.play().catch(() => {});
            // Remover listeners después de la primera interacción
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          
          // Agregar listeners para detectar la primera interacción del usuario
          document.addEventListener('touchstart', handleUserInteraction);
          document.addEventListener('click', handleUserInteraction);
        }
      }
    };

    // Intentar reproducir el video solo si está visible
    if (isVisible) {
      playVideo();
    }

    // Event listeners para debugging y monitoreo del video
    // video.addEventListener('loadstart', () => console.log('🎬 Video empezando a cargar'));
    // video.addEventListener('canplay', () => console.log('🎬 Video listo para reproducir'));
    // video.addEventListener('play', () => console.log('🎬 Video reproduciéndose'));
    // video.addEventListener('error', (e) => console.error('❌ Error en video:', e));

    // Cleanup: remover event listeners al desmontar el componente
    return () => {
      video.removeEventListener('loadstart', () => {});
      video.removeEventListener('canplay', () => {});
      video.removeEventListener('play', () => {});
      video.removeEventListener('error', () => {});
    };
  }, [isMobile, isVisible]); // Se ejecuta cuando cambia el estado de móvil o visibilidad

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="nexus-section nexus-video-section"
    >
      {/* Video de fondo con configuración optimizada */}
      <video
        ref={videoRef}
        className="nexus-video-bg"
        autoPlay={false} // Cambiado a false para control manual
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/video-poster.jpg"
      >
        <source
          src={getVideoSource()}
          type="video/mp4"
        />
        {/* Fallback para navegadores que no soportan video */}
        <div className="nexus-video-fallback">
          <img
            src="/assets/video-fallback.jpg"
            alt="Experiencia VR"
            loading="lazy"
          />
        </div>
      </video>
      
      {/* Contenido superpuesto sobre el video */}
      <div className="nexus-video-content">
        {/* Título con animación de entrada */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.nav[0]}
        </motion.h2>
        
        {/* Texto con animación de entrada */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t.experienceSubtitle}
        </motion.p>
        {isDataSaving && (
          <div className="data-saving-notice">
            Modo ahorro de datos activado - Calidad de video reducida
          </div>
        )}
      </div>
    </section>
  );
} 