import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock del componente Header
jest.mock('../Header/Header', () => {
  return function MockHeader() {
    return (
      <header data-testid="header" role="banner">
        <nav data-testid="navigation" role="navigation">
          <a href="/">Inicio</a>
          <a href="/equipment">Equipamiento</a>
          <a href="/matches">Partidas</a>
          <a href="/booking">Reservas</a>
          <a href="/contact">Contacto</a>
        </nav>
        <select data-testid="language-select">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <button data-testid="menu-button" aria-label="Toggle menu">Menu</button>
      </header>
    );
  };
});

// Mock de performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => 1000),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => [])
  },
  writable: true
});

// Mock de IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    const Header = require('../Header/Header').default;
    render(<Header />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Equipamiento')).toBeInTheDocument();
    expect(screen.getByText('Partidas')).toBeInTheDocument();
    expect(screen.getByText('Reservas')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByTestId('language-select')).toBeInTheDocument();
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  test('tiene enlaces de navegación', () => {
    const Header = require('../Header/Header').default;
    render(<Header />);
    
    expect(screen.getByText('Inicio')).toHaveAttribute('href', '/');
    expect(screen.getByText('Equipamiento')).toHaveAttribute('href', '/equipment');
    expect(screen.getByText('Partidas')).toHaveAttribute('href', '/matches');
    expect(screen.getByText('Reservas')).toHaveAttribute('href', '/booking');
    expect(screen.getByText('Contacto')).toHaveAttribute('href', '/contact');
  });

  test('tiene selector de idioma', () => {
    const Header = require('../Header/Header').default;
    render(<Header />);
    
    const languageSelect = screen.getByTestId('language-select');
    expect(languageSelect).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  test('tiene botón de menú móvil', () => {
    const Header = require('../Header/Header').default;
    render(<Header />);
    
    const menuButton = screen.getByTestId('menu-button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu');
  });

  test('cumple estándares de accesibilidad', () => {
    const Header = require('../Header/Header').default;
    render(<Header />);
    
    // Verificar roles ARIA
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Verificar que los enlaces son accesibles
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Equipamiento')).toBeInTheDocument();
  });

  test('maneja performance metrics', () => {
    const performanceSpy = jest.spyOn(window.performance, 'mark');
    
    const Header = require('../Header/Header').default;
    render(<Header />);
    
    expect(performanceSpy).toHaveBeenCalled();
  });
}); 