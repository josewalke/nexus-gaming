describe('Nexus Gaming Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Esperar a que cargue completamente
  });

  it('carga la página principal correctamente', () => {
    cy.get('h1').should('contain', 'Nexus Gaming');
    cy.get('nav').should('be.visible');
    cy.get('main').should('be.visible');
  });

  it('navega entre secciones correctamente', () => {
    // Verificar que las secciones existen
    cy.get('section#experience').should('exist');
    cy.get('section#matches').should('exist');
    cy.get('section#equipment').should('exist');

    // Navegar a cada sección
    cy.get('a[href="#experiencia"]').click();
    cy.url().should('include', '#experiencia');
    cy.get('section#experience').should('be.visible');

    cy.get('a[href="#partidas"]').click();
    cy.url().should('include', '#partidas');
    cy.get('section#matches').should('be.visible');

    cy.get('a[href="#equipamiento"]').click();
    cy.url().should('include', '#equipamiento');
    cy.get('section#equipment').should('be.visible');
  });

  it('cambia idioma correctamente', () => {
    // Verificar idioma inicial (español)
    cy.get('nav').should('contain', 'Experiencia');
    cy.get('nav').should('contain', 'Partidas');
    cy.get('nav').should('contain', 'Equipamiento');

    // Cambiar a inglés
    cy.get('select').select('en');
    cy.wait(500);

    // Verificar que cambió a inglés
    cy.get('nav').should('contain', 'Experience');
    cy.get('nav').should('contain', 'Matches');
    cy.get('nav').should('contain', 'Equipment');

    // Cambiar de vuelta a español
    cy.get('select').select('es');
    cy.wait(500);

    // Verificar que volvió a español
    cy.get('nav').should('contain', 'Experiencia');
    cy.get('nav').should('contain', 'Partidas');
    cy.get('nav').should('contain', 'Equipamiento');
  });

  it('maneja menú móvil correctamente', () => {
    // Cambiar a vista móvil
    cy.viewport(375, 667);

    // Verificar que el menú está cerrado inicialmente
    cy.get('.nexus-nav').should('not.have.class', 'open');

    // Abrir menú
    cy.get('.menu-toggle').click();
    cy.get('.nexus-nav').should('have.class', 'open');

    // Cerrar menú
    cy.get('.menu-toggle').click();
    cy.get('.nexus-nav').should('not.have.class', 'open');
  });

  it('muestra métricas de performance', () => {
    // Verificar que las métricas están visibles en desktop
    cy.viewport(1280, 720);
    cy.get('.performance-metrics').should('be.visible');
    cy.get('.metric').should('have.length.at.least', 3);

    // Verificar que las métricas están ocultas en móvil
    cy.viewport(375, 667);
    cy.get('.performance-metrics').should('not.be.visible');
  });

  it('carga imágenes correctamente', () => {
    // Verificar que las imágenes principales cargan
    cy.get('img[src*="kat-vr.png"]').should('be.visible');
    cy.get('img[src*="owo-vest.png"]').should('be.visible');
    
    // Verificar que las imágenes tienen alt text
    cy.get('img[src*="kat-vr.png"]').should('have.attr', 'alt');
    cy.get('img[src*="owo-vest.png"]').should('have.attr', 'alt');
  });

  it('reproduce video correctamente', () => {
    // Verificar que el video existe
    cy.get('video').should('exist');
    
    // Verificar que el video tiene los atributos correctos
    cy.get('video').should('have.attr', 'autoplay');
    cy.get('video').should('have.attr', 'muted');
    cy.get('video').should('have.attr', 'loop');
    cy.get('video').should('have.attr', 'playsinline');
  });

  it('maneja scroll suave', () => {
    // Verificar que el scroll suave funciona
    cy.get('a[href="#equipamiento"]').click();
    cy.wait(1000);
    
    // Verificar que llegó a la sección
    cy.get('section#equipment').should('be.visible');
    cy.url().should('include', '#equipamiento');
  });

  it('es responsive en diferentes tamaños', () => {
    // Desktop
    cy.viewport(1920, 1080);
    cy.get('.nexus-header-content').should('be.visible');
    
    // Tablet
    cy.viewport(768, 1024);
    cy.get('.nexus-header-content').should('be.visible');
    
    // Mobile
    cy.viewport(375, 667);
    cy.get('.nexus-header-content').should('be.visible');
  });

  it('cumple estándares de accesibilidad', () => {
    // Verificar roles ARIA
    cy.get('header').should('have.attr', 'role', 'banner');
    cy.get('nav').should('have.attr', 'role', 'navigation');
    
    // Verificar labels
    cy.get('button[aria-label="Toggle menu"]').should('exist');
    
    // Verificar contraste de colores (básico)
    cy.get('body').should('have.css', 'color');
    cy.get('body').should('have.css', 'background-color');
  });

  it('maneja errores de carga graciosamente', () => {
    // Simular error de red
    cy.intercept('GET', '**/*.png', { statusCode: 404 });
    cy.reload();
    
    // La página debe seguir funcionando
    cy.get('h1').should('contain', 'Nexus Gaming');
    cy.get('nav').should('be.visible');
  });
}); 