// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configuración global de Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Evitar que Cypress falle en errores no críticos
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Script error')) {
    return false;
  }
  return true;
});

// Configurar viewport por defecto
Cypress.config('viewportWidth', 1280);
Cypress.config('viewportHeight', 720);

// Configurar timeouts
Cypress.config('defaultCommandTimeout', 10000);
Cypress.config('requestTimeout', 10000);
Cypress.config('responseTimeout', 10000);

// Configurar retries
Cypress.config('retries', {
  runMode: 2,
  openMode: 0
});

// Configurar video y screenshots
Cypress.config('video', false);
Cypress.config('screenshotOnRunFailure', true);

// Configurar base URL
Cypress.config('baseUrl', 'http://localhost:3000');

// Configurar variables de entorno
Cypress.env('NODE_ENV', 'test');
Cypress.env('CYPRESS_BASE_URL', 'http://localhost:3000');

// Configurar hooks globales
beforeEach(() => {
  // Limpiar localStorage antes de cada test
  cy.clearLocalStorage();
  
  // Limpiar sessionStorage antes de cada test
  cy.clearSessionStorage();
  
  // Limpiar cookies antes de cada test
  cy.clearCookies();
});

afterEach(() => {
  // Tomar screenshot en caso de fallo
  if (Cypress.currentRetry < Cypress.config('retries').runMode) {
    cy.screenshot();
  }
});

// Configurar comandos personalizados
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.wait(1000); // Esperar a que carguen los componentes
});

Cypress.Commands.add('checkPerformance', () => {
  // Verificar que la página carga rápidamente
  cy.window().then((win) => {
    const performance = win.performance;
    const navigation = performance.getEntriesByType('navigation')[0];
    
    // Verificar que la página carga en menos de 5 segundos
    expect(navigation.loadEventEnd - navigation.loadEventStart).to.be.lessThan(5000);
  });
});

Cypress.Commands.add('checkAccessibility', () => {
  // Verificar roles ARIA básicos
  cy.get('header').should('have.attr', 'role', 'banner');
  cy.get('nav').should('have.attr', 'role', 'navigation');
  cy.get('main').should('have.attr', 'role', 'main');
});

Cypress.Commands.add('checkResponsive', () => {
  // Verificar que la página es responsive
  const viewports = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' }
  ];
  
  viewports.forEach(viewport => {
    cy.viewport(viewport.width, viewport.height);
    cy.get('body').should('be.visible');
    cy.get('.nexus-header').should('be.visible');
  });
});

Cypress.Commands.add('checkSEO', () => {
  // Verificar elementos SEO básicos
  cy.get('title').should('exist');
  cy.get('meta[name="description"]').should('exist');
  cy.get('meta[name="keywords"]').should('exist');
  cy.get('link[rel="canonical"]').should('exist');
});

Cypress.Commands.add('checkPWA', () => {
  // Verificar elementos PWA básicos
  cy.get('link[rel="manifest"]').should('exist');
  cy.get('meta[name="theme-color"]').should('exist');
  cy.get('meta[name="apple-mobile-web-app-capable"]').should('exist');
});

// Configurar tipos de comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      waitForPageLoad(): Chainable<void>;
      checkPerformance(): Chainable<void>;
      checkAccessibility(): Chainable<void>;
      checkResponsive(): Chainable<void>;
      checkSEO(): Chainable<void>;
      checkPWA(): Chainable<void>;
    }
  }
} 