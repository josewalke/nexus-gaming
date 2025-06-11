import { useState, useEffect } from 'react';
import { BREAKPOINTS, getDeviceType, isTouchDevice, hasNotch } from '../config/responsive';

export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState(getDeviceType());
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINTS.tablet);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= BREAKPOINTS.mobileLarge && window.innerWidth < BREAKPOINTS.tablet
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= BREAKPOINTS.tablet);
  const [isTouch] = useState(isTouchDevice());
  const [hasNotchDevice] = useState(hasNotch());
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceType(getDeviceType());
      setIsMobile(width < BREAKPOINTS.tablet);
      setIsTablet(width >= BREAKPOINTS.mobileLarge && width < BREAKPOINTS.tablet);
      setIsDesktop(width >= BREAKPOINTS.tablet);
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const handleOrientationChange = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    hasNotchDevice,
    orientation,
    breakpoints: BREAKPOINTS
  };
};

// Hook específico para breakpoints
export const useBreakpoint = (breakpoint) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      switch (breakpoint) {
        case 'mobile':
          setIsActive(width < BREAKPOINTS.mobileLarge);
          break;
        case 'tablet':
          setIsActive(width >= BREAKPOINTS.mobileLarge && width < BREAKPOINTS.tablet);
          break;
        case 'desktop':
          setIsActive(width >= BREAKPOINTS.tablet);
          break;
        case 'mobileAndTablet':
          setIsActive(width < BREAKPOINTS.tablet);
          break;
        case 'tabletAndDesktop':
          setIsActive(width >= BREAKPOINTS.mobileLarge);
          break;
        default:
          setIsActive(false);
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);

    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return isActive;
};

// Hook para detectar cambios de orientación
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return orientation;
}; 