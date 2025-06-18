// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando para esperar a que la página cargue completamente
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.wait(1000); // Esperar a que carguen los componentes
});

// Comando para verificar performance
Cypress.Commands.add('checkPerformance', () => {
  cy.window().then((win) => {
    const performance = win.performance;
    const navigation = performance.getEntriesByType('navigation')[0];
    
    // Verificar que la página carga en menos de 5 segundos
    expect(navigation.loadEventEnd - navigation.loadEventStart).to.be.lessThan(5000);
  });
});

// Comando para verificar accesibilidad
Cypress.Commands.add('checkAccessibility', () => {
  cy.get('header').should('have.attr', 'role', 'banner');
  cy.get('nav').should('have.attr', 'role', 'navigation');
});

// Comando para verificar responsive design
Cypress.Commands.add('checkResponsive', () => {
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

// Comando para verificar SEO
Cypress.Commands.add('checkSEO', () => {
  cy.get('title').should('exist');
  cy.get('meta[name="description"]').should('exist');
  cy.get('meta[name="keywords"]').should('exist');
  cy.get('link[rel="canonical"]').should('exist');
});

// Comando para verificar PWA
Cypress.Commands.add('checkPWA', () => {
  cy.get('link[rel="manifest"]').should('exist');
  cy.get('meta[name="theme-color"]').should('exist');
  cy.get('meta[name="apple-mobile-web-app-capable"]').should('exist');
});

// Comando para cambiar idioma
Cypress.Commands.add('changeLanguage', (language) => {
  cy.get('select').select(language);
  cy.wait(500);
});

// Comando para navegar a sección
Cypress.Commands.add('navigateToSection', (sectionId) => {
  cy.get(`a[href="#${sectionId}"]`).click();
  cy.wait(1000);
  cy.get(`section#${sectionId}`).should('be.visible');
});

// Comando para verificar métricas de performance
Cypress.Commands.add('checkPerformanceMetrics', () => {
  cy.viewport(1280, 720);
  cy.get('.performance-metrics').should('be.visible');
  cy.get('.metric').should('have.length.at.least', 3);
});

// Comando para verificar carga de imágenes
Cypress.Commands.add('checkImageLoading', () => {
  cy.get('img[src*="kat-vr.png"]').should('be.visible');
  cy.get('img[src*="owo-vest.png"]').should('be.visible');
  cy.get('img[src*="kat-vr.png"]').should('have.attr', 'alt');
  cy.get('img[src*="owo-vest.png"]').should('have.attr', 'alt');
});

// Comando para verificar reproducción de video
Cypress.Commands.add('checkVideoPlayback', () => {
  cy.get('video').should('exist');
  cy.get('video').should('have.attr', 'autoplay');
  cy.get('video').should('have.attr', 'muted');
  cy.get('video').should('have.attr', 'loop');
  cy.get('video').should('have.attr', 'playsinline');
});

// Comando para verificar menú móvil
Cypress.Commands.add('checkMobileMenu', () => {
  cy.viewport(375, 667);
  cy.get('.nexus-nav').should('not.have.class', 'open');
  cy.get('.menu-toggle').click();
  cy.get('.nexus-nav').should('have.class', 'open');
  cy.get('.menu-toggle').click();
  cy.get('.nexus-nav').should('not.have.class', 'open');
});

// Comando para verificar scroll suave
Cypress.Commands.add('checkSmoothScroll', () => {
  cy.get('a[href="#equipamiento"]').click();
  cy.wait(1000);
  cy.get('section#equipment').should('be.visible');
  cy.url().should('include', '#equipamiento');
});

// Comando para verificar manejo de errores
Cypress.Commands.add('checkErrorHandling', () => {
  cy.intercept('GET', '**/*.png', { statusCode: 404 });
  cy.reload();
  cy.get('h1').should('contain', 'Nexus Gaming');
  cy.get('nav').should('be.visible');
}); 