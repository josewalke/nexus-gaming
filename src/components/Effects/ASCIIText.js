import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente ASCIIText
 * Genera texto ASCII real con caracteres que cambian dinámicamente
 * @param {string} text - El texto a convertir a ASCII
 * @param {number} asciiFontSize - Tamaño de fuente para el ASCII
 */
const ASCIIText = ({ text, asciiFontSize = 8 }) => {
  const [displayText, setDisplayText] = useState(text);

  // Caracteres ASCII para el efecto
  const asciiChars = ['@', '#', '$', '%', '&', '*', '+', '=', '~', '!', '?', '^', '|', '/', '\\', '>', '<', ';', ':', '"', "'", '`', '-', '_', '.', ',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Función para generar texto ASCII manteniendo la estructura
  const generateAsciiText = (inputText) => {
    return inputText.split('').map(char => {
      if (char === ' ') return ' ';
      if (char === '_') return '_';
      if (char === '-') return '-';
      if (char === '.') return '.';
      if (char === ',') return ',';
      if (char === '!') return '!';
      if (char === '?') return '?';
      // Para letras y números, ocasionalmente cambiar a ASCII
      if (Math.random() < 0.3) { // 30% de probabilidad de cambiar
        return asciiChars[Math.floor(Math.random() * asciiChars.length)];
      }
      return char; // Mantener el carácter original
    }).join('');
  };

  // Efecto para cambiar caracteres periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(generateAsciiText(text));
    }, 500); // Cambia cada 500ms

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      style={{
        fontFamily: 'monospace',
        fontSize: `${asciiFontSize}px`,
        color: '#00FFFF',
        textShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
        whiteSpace: 'pre',
        lineHeight: '1.2',
        letterSpacing: '1px',
        fontWeight: 'bold',
      }}
    >
      {displayText}
    </motion.div>
  );
};

export default ASCIIText; 