import React from 'react';
import translations from '../../translations';
import './Footer.css';

export default function Footer({ lang }) {
  const t = translations[lang];

  return (
    <footer className="nexus-footer">
      &copy; 2025 Nexus Gaming eSport. {t.footer}
    </footer>
  );
} 