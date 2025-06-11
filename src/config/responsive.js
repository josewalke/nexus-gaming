// Configuración de breakpoints responsive
export const BREAKPOINTS = {
  mobile: 350,
  mobileLarge: 480,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1200,
  desktopXLarge: 1440
};

// Configuración de dispositivos
export const DEVICES = {
  mobile: `(max-width: ${BREAKPOINTS.mobileLarge - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobileLarge}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktopLarge: `(min-width: ${BREAKPOINTS.desktop}px)`
};

// Configuración de orientación
export const ORIENTATION = {
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)'
};

// Configuración de características del dispositivo
export const FEATURES = {
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
  highDPI: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  reducedMotion: '(prefers-reduced-motion: reduce)'
};

// Configuración de safe areas para dispositivos con notch
export const SAFE_AREAS = {
  top: 'env(safe-area-inset-top)',
  bottom: 'env(safe-area-inset-bottom)',
  left: 'env(safe-area-inset-left)',
  right: 'env(safe-area-inset-right)'
};

// Función para detectar el tipo de dispositivo
export const getDeviceType = () => {
  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.mobileLarge) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  if (width < BREAKPOINTS.desktop) return 'desktop';
  return 'desktopLarge';
};

// Función para detectar si es un dispositivo táctil
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Función para detectar si el dispositivo tiene notch
export const hasNotch = () => {
  return CSS.supports('padding', 'max(0px)');
};

// Función para obtener el tamaño de pantalla actual
export const getScreenSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  };
};

// Configuración de tamaños de fuente responsivos
export const FONT_SIZES = {
  h1: {
    mobile: '24px',
    tablet: '36px',
    desktop: '58px',
    desktopLarge: '72px'
  },
  h2: {
    mobile: '18px',
    tablet: '28px',
    desktop: '46px',
    desktopLarge: '56px'
  },
  h3: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
    desktopLarge: '40px'
  },
  body: {
    mobile: '11px',
    tablet: '14px',
    desktop: '18px',
    desktopLarge: '20px'
  }
};

// Configuración de espaciado responsivo
export const SPACING = {
  xs: {
    mobile: '8px',
    tablet: '10px',
    desktop: '15px',
    desktopLarge: '20px'
  },
  sm: {
    mobile: '15px',
    tablet: '20px',
    desktop: '30px',
    desktopLarge: '40px'
  },
  md: {
    mobile: '20px',
    tablet: '30px',
    desktop: '60px',
    desktopLarge: '80px'
  },
  lg: {
    mobile: '30px',
    tablet: '40px',
    desktop: '80px',
    desktopLarge: '120px'
  }
}; 