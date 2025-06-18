import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock del componente App principal
jest.mock('../../App', () => {
  return function MockApp() {
    return <div data-testid="app">Nexus Gaming App</div>;
  };
});

// Mock de service worker
const mockServiceWorker = {
  register: jest.fn().mockResolvedValue({}),
  getRegistrations: jest.fn().mockResolvedValue([])
};

Object.defineProperty(navigator, 'serviceWorker', {
  value: mockServiceWorker,
  writable: true
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

// Mock de ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    const App = require('../../App').default;
    render(<App />);
    
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  test('maneja errores de service worker', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockServiceWorker.register.mockRejectedValue(new Error('SW registration failed'));

    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const App = require('../../App').default;
    render(<App />);

    // Esperar un poco para que se ejecute el registro del SW
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  test('configura performance monitoring', () => {
    const performanceSpy = jest.spyOn(window.performance, 'mark');
    
    const App = require('../../App').default;
    render(<App />);

    expect(performanceSpy).toHaveBeenCalled();
  });
}); 