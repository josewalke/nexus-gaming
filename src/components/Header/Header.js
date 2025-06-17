import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import translations from '../../translations';
import './Header.css';
import { SHOW_DEBUG } from '../../config/debug';
import { useResponsive } from '../../hooks/useResponsive';
import { getConnectionInfo } from '../../config/video';

export default function Header({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const responsive = useResponsive();
  const [debugOpen, setDebugOpen] = useState(() => {
    const saved = localStorage.getItem('nexusDebugPanelOpen');
    return saved === null ? false : saved === 'true';
  });
  const [connection, setConnection] = useState(getConnectionInfo());
  const [ping, setPing] = useState(null);
  const [deviceMemory, setDeviceMemory] = useState(navigator.deviceMemory || 'N/A');
  const [fps, setFps] = useState(null);
  const [pageLoad, setPageLoad] = useState(null);

  const t = translations[lang];

  const langOptions = [
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' }
  ];

  const navLinks = [
    { id: 'experience', label: t.nav[0] },
    { id: 'matches', label: t.nav[1] },
    { id: 'equipment', label: t.nav[2] }
  ];

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Cerrar menú al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Actualizar info de conexión en tiempo real
  useEffect(() => {
    const updateConnection = () => setConnection(getConnectionInfo());
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateConnection);
    }
    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', updateConnection);
      }
    };
  }, []);

  // Test de lag (ping a google)
  useEffect(() => {
    const testPing = async () => {
      const start = Date.now();
      try {
        await fetch('https://www.google.com/favicon.ico?_=' + Date.now(), { method: 'HEAD', cache: 'no-store' });
        setPing(Date.now() - start);
      } catch {
        setPing(null);
      }
    };
    testPing();
    const interval = setInterval(testPing, 10000); // Actualiza cada 10s
    return () => clearInterval(interval);
  }, []);

  // Medir FPS
  useEffect(() => {
    let frames = 0;
    let lastFpsUpdate = performance.now();
    function loop(now) {
      frames++;
      if (now - lastFpsUpdate > 1000) {
        setFps(frames);
        frames = 0;
        lastFpsUpdate = now;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Medir tiempo de carga de la página
  useEffect(() => {
    if (performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd && timing.navigationStart ? (timing.loadEventEnd - timing.navigationStart) : null;
      setPageLoad(loadTime);
    } else {
      setPageLoad(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexusDebugPanelOpen', debugOpen);
  }, [debugOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (id) => {
    setMenuOpen(false);
    
    // Si estamos en la página de reservas, navegar a la página principal
    if (location.pathname !== '/') {
      navigate('/');
      // Esperar a que se cargue la página principal antes de hacer scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll suave al elemento en la página principal
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="nexus-header">
      <div className="nexus-header-inner">
        <div className="nexus-brand">
          <div className="nexus-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            NEXUS eSPORT VR
          </div>
          <button 
            className="nexus-menu-toggle" 
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>

      <nav className={`nexus-nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link, i) => (
          <a 
            key={i} 
            href={`#${link.id}`} 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="nexus-nav-item">
          <Select
            options={langOptions}
            menuPlacement="auto"
            isSearchable={false}
            defaultValue={langOptions.find(opt => opt.value === lang)}
            onChange={(e) => setLang(e.value)}
            classNamePrefix="nexus-select"
            className="nexus-select"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#00FFFF',
                fontFamily: 'Orbitron',
                fontSize: '16px',
                minHeight: '40px',
                height: '35px',
                boxShadow: state.isFocused ? '0 0 8px #00FFFF' : 'none',
                cursor: 'pointer',
                transition: '0.3s ease',
                borderRadius: '8px'
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: 2,
                color: '#00FFFF',
                transition: '0.3s ease',
              }),
              indicatorSeparator: () => ({ display: 'none' }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#0a0a0a',
                border: '1px solid #00FFFF',
                borderRadius: '8px',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#00FFFF' : '#0a0a0a',
                color: state.isFocused ? '#0a0a0a' : '#00FFFF',
                fontSize: '13px',
                padding: '8px 12px',
                fontFamily: 'Orbitron',
                cursor: 'pointer',
                transition: '0.3s ease',
              }),
              singleValue: (base) => ({
                ...base,
                color: '#00FFFF',
                fontWeight: 'bold',
              }),
            }}
          />
        </div>
      </nav>
      {SHOW_DEBUG && (
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 9999,
          fontFamily: 'Orbitron, sans-serif',
        }}>
          <div
            style={{
              background: 'limegreen',
              color: '#111',
              padding: debugOpen ? '12px 24px' : '8px 18px',
              borderRadius: '8px',
              fontWeight: 'bold',
              minWidth: debugOpen ? 260 : 80,
              maxWidth: 350,
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: debugOpen ? 'flex-end' : 'center',
            }}
            onClick={() => setDebugOpen((v) => !v)}
            title={debugOpen ? 'Ocultar debug' : 'Mostrar debug'}
          >
            <span style={{marginRight: debugOpen ? 12 : 0, fontWeight: 700}}>
              {debugOpen ? 'DEBUG ACTIVO' : 'DEBUG'}
            </span>
            <span style={{fontSize: 18, transform: debugOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}>
              ▶
            </span>
          </div>
          {debugOpen && (
            <div style={{
              background: 'white',
              color: '#111',
              marginTop: 2,
              borderRadius: '8px',
              padding: '12px 18px',
              fontWeight: 400,
              fontSize: 14,
              wordBreak: 'break-all',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              minWidth: 260,
              maxWidth: 350,
            }}>
              <div><b>Ancho ventana:</b> {window.innerWidth}px</div>
              <div><b>Alto ventana:</b> {window.innerHeight}px</div>
              <div><b>Idioma:</b> {lang}</div>
              <div><b>Dispositivo:</b> {responsive.isDesktop ? 'Desktop' : responsive.isTablet ? 'Tablet' : 'Móvil'}</div>
              <div><b>Orientación:</b> {responsive.orientation}</div>
              <div><b>Touch:</b> {responsive.isTouch ? 'Sí' : 'No'}</div>
              <div><b>Notch:</b> {responsive.hasNotchDevice ? 'Sí' : 'No'}</div>
              <div><b>Ruta actual:</b> {location.pathname}</div>
              <div><b>userAgent:</b> {navigator.userAgent}</div>
              <div><b>Fecha/Hora:</b> {new Date().toLocaleString()}</div>
              <div><b>Menú abierto:</b> {menuOpen ? 'Sí' : 'No'}</div>
              <hr style={{margin: '10px 0'}} />
              <div><b>Conexión:</b> {connection.effectiveType}</div>
              <div><b>Velocidad estimada:</b> {connection.downlink ? connection.downlink + ' Mbps' : 'N/A'}</div>
              <div><b>Latencia estimada:</b> {connection.rtt ? connection.rtt + ' ms' : 'N/A'}</div>
              <div><b>Lag (ping real):</b> {ping !== null ? ping + ' ms' : 'N/A'}</div>
              <hr style={{margin: '10px 0'}} />
              <div>
                <b>Memoria disponible:</b> 
                <span style={{color: deviceMemory !== 'N/A' && deviceMemory < 2 ? 'red' : '#111'}}>
                  {deviceMemory !== 'N/A' ? deviceMemory + ' GB' : 'N/A'}
                </span>
              </div>
              <div>
                <b>FPS (aprox):</b> 
                <span style={{
                  color: fps === null ? '#111' : fps >= 50 ? 'green' : fps >= 30 ? 'orange' : 'red',
                  fontWeight: fps !== null && fps < 30 ? 'bold' : 'normal',
                }}>
                  {fps !== null ? fps : 'N/A'}
                </span>
              </div>
              <div>
                <b>Tiempo de carga:</b> 
                <span style={{
                  color: pageLoad === null ? '#111' : pageLoad < 1500 ? 'green' : pageLoad < 3000 ? 'orange' : 'red',
                  fontWeight: pageLoad !== null && pageLoad > 3000 ? 'bold' : 'normal',
                }}>
                  {pageLoad !== null ? pageLoad + ' ms' : 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
} 