import React, { Suspense } from 'react';

// Componente de carga
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    color: '#00FFFF',
    fontSize: '18px',
    fontFamily: 'Orbitron'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid #00FFFF',
      borderTop: '3px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '15px'
    }}></div>
    Cargando...
  </div>
);

// Componente Lazy wrapper
export default function LazyComponent({ children }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}

// Agregar estilos para la animación
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style); 