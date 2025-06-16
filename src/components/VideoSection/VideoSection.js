import React, { useRef, useEffect, useState } from 'react';
import { PERFORMANCE_CONFIG } from '../../config/performance';
import translations from '../../translations';
import { useResponsive } from '../../hooks/useResponsive';
import { TypewriterText } from '../Effects/ScrollEffects';
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
  const [videoQuality, setVideoQuality] = useState('high');
  const [isDataSaving, setIsDataSaving] = useState(false);

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

    // Intentar reproducir el video
    playVideo();

    // Event listeners para debugging y monitoreo del video
    video.addEventListener('loadstart', () => console.log('🎬 Video empezando a cargar'));
    video.addEventListener('canplay', () => console.log('🎬 Video listo para reproducir'));
    video.addEventListener('play', () => console.log('🎬 Video reproduciéndose'));
    video.addEventListener('error', (e) => console.error('❌ Error en video:', e));

    // Cleanup: remover event listeners al desmontar el componente
    return () => {
      video.removeEventListener('loadstart', () => {});
      video.removeEventListener('canplay', () => {});
      video.removeEventListener('play', () => {});
      video.removeEventListener('error', () => {});
    };
  }, [isMobile]); // Se ejecuta cuando cambia el estado de móvil

  return (
    <section id="experience" className="nexus-section nexus-video-section">
      {/* Video de fondo con configuración optimizada */}
      <video
        ref={videoRef}
        className="nexus-video-bg"
        autoPlay
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
        
        {/* Texto con efecto de máquina de escribir */}
        <TypewriterText delay={0.3}>
          <p>{t.experienceSubtitle}</p>
        </TypewriterText>
        {isDataSaving && (
          <div className="data-saving-notice">
            Modo ahorro de datos activado - Calidad de video reducida
          </div>
        )}
      </div>
    </section>
  );
} 