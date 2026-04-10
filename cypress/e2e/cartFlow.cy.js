describe('Auth + Cart Flow', () => {
  it('should NOT redirect to login after adding to cart', () => {

    cy.visit('http://localhost:5174');

    cy.contains('Login').click();

    cy.url().should('include', '/login');

    cy.get('input[name="email"]', { timeout: 10000 }).should('be.visible');
    cy.get('input[name="email"]').type('test@gmail.com');

    cy.get('input[name="password"]').type('123456');

    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');

    cy.contains('Add to Cart').first().click();

    cy.url().should('not.include', '/login');
  });
});