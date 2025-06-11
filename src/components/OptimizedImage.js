import React, { useState, useEffect, useRef } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/assets/placeholder.jpg',
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    let observer;
    
    if (imageRef) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '50px'
          }
        );
        observer.observe(imageRef);
        observerRef.current = observer;
      } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        setIsInView(true);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        // Si falla la carga, mantener el placeholder
        console.warn(`Failed to load image: ${src}`);
      };
    }
  }, [isInView, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      {...props}
    />
  );
} 