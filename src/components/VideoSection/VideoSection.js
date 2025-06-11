import React, { useRef, useEffect } from 'react';
import translations from '../../translations';
import { useResponsive } from '../../hooks/useResponsive';
import './VideoSection.css';

export default function VideoSection({ lang }) {
  const t = translations[lang];
  const { isMobile } = useResponsive();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intentar reproducir el video inmediatamente
    const playVideo = async () => {
      try {
        await video.play();
        console.log('✅ Video reproduciéndose correctamente');
      } catch (error) {
        console.warn('⚠️ No se pudo autoplay:', error);
        // En móviles, esperar interacción del usuario
        if (isMobile) {
          const handleUserInteraction = () => {
            video.play().catch(console.warn);
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          document.addEventListener('touchstart', handleUserInteraction);
          document.addEventListener('click', handleUserInteraction);
        }
      }
    };

    playVideo();

    // Event listeners para debugging
    video.addEventListener('loadstart', () => console.log('🎬 Video empezando a cargar'));
    video.addEventListener('canplay', () => console.log('🎬 Video listo para reproducir'));
    video.addEventListener('play', () => console.log('🎬 Video reproduciéndose'));
    video.addEventListener('error', (e) => console.error('❌ Error en video:', e));

    return () => {
      video.removeEventListener('loadstart', () => {});
      video.removeEventListener('canplay', () => {});
      video.removeEventListener('play', () => {});
      video.removeEventListener('error', () => {});
    };
  }, [isMobile]);

  return (
    <section id="experience" className="nexus-section nexus-video-section">
      <video
        ref={videoRef}
        className="nexus-video-bg"
        src="/assets/experience-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      />
      
      <div className="nexus-video-content">
        <h2>{t.nav[0]}</h2>
        <p>Discover our unique immersive VR worlds and premium facilities.</p>
      </div>
    </section>
  );
} 