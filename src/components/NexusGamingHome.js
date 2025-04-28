import React, { useState } from 'react';
import translations from '../translations';
import './NexusGamingHome.css';
import Select from 'react-select';

export default function NexusGamingHome() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="nexus-container">
      <header className="nexus-header">
        <div className="nexus-header-inner">
          <div className="nexus-brand">
            <div className="nexus-logo">NEXUS GAMING eSPORT</div>
            <button className="nexus-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
        </div>

        {/* Navegación separada, ocupa toda la pantalla */}
        <nav className={`nexus-nav ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link, i) => (
            <a key={i} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="nexus-nav-item">
            <Select
              options={langOptions}
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
                  fontSize: '14px',
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



      <section className="nexus-hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <button>{t.book}</button>
      </section>

      <section className="nexus-parallax">
        <h2>Enter the VR World</h2>
      </section>

      <section id="experience" className="nexus-section nexus-video-section">
        <video
          className="nexus-video-bg"
          src="/assets/experience-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="nexus-video-content">
          <h2>{t.nav[0]}</h2>
          <p>Discover our unique immersive VR worlds and premium facilities.</p>
        </div>
      </section>

      <section id="matches" className="nexus-section">
        <h2>{t.section2}</h2>
        <p>{t.section2Text}</p>
      </section>

      <section id="equipment" className="nexus-section">
        <h2>{t.section1}</h2>
        <p>{t.section1Text}</p>

        <div className="equipment-block">
          <div className="equipment-image">
            <img src="/assets/kat-vr.png" alt={t.equipment.kat.title} />
          </div>
          <div className="equipment-text">
            <h3>{t.equipment.kat.title}</h3>
            <p>{t.equipment.kat.text}</p>
          </div>
        </div>

        <div className="equipment-block reverse">
          <div className="equipment-image">
            <img src="/assets/owo-vest.png" alt={t.equipment.owo.title} />
          </div>
          <div className="equipment-text">
            <h3>{t.equipment.owo.title}</h3>
            <p>{t.equipment.owo.text}</p>
          </div>
        </div>
      </section>

      <footer className="nexus-footer">
        &copy; 2025 Nexus Gaming eSport. {t.footer}
      </footer>
    </div>
  );
}
