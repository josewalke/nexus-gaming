import React, { useState, useEffect, useRef } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  decoding = 'async',
  sizes = '100vw',
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    const img = imageRef.current;
    if (img) {
      const handleLoad = () => {
        setIsLoaded(true);
        setHasError(false);
      };
      
      const handleError = () => {
        console.warn(`Failed to load image: ${src}`);
        setHasError(true);
        setIsLoaded(false);
      };

      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);

      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
    }
  }, [src]);

  // Generar un alt descriptivo si no se proporciona
  const generateAlt = (imageSrc) => {
    if (alt) return alt;
    
    // Extraer nombre del archivo y generar descripción
    const fileName = imageSrc.split('/').pop().split('.')[0];
    const words = fileName.replace(/[-_]/g, ' ').split(' ');
    const capitalizedWords = words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    
    return `Imagen de ${capitalizedWords.join(' ')}`;
  };

  return (
    <img
      ref={imageRef}
      src={src}
      alt={generateAlt(src)}
      className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      onError={() => setHasError(true)}
      {...props}
    />
  );
} 