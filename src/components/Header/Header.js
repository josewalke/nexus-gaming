import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import translations from '../../translations';
import './Header.css';

export default function Header({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    </header>
  );
} 