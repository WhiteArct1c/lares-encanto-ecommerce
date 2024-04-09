describe('Customer orders and order checkout', () => {
  beforeEach(() =>{
    cy.visit('/login');
    cy.get('input[name="email"]').type('matheusbispo@gmail.com');
    cy.get('input[name="password"]').type('Mat15766@');
    cy.contains('button', 'Entrar').click();
    cy.wait(1000);

    cy.get('[data-cy="product-card-1"]').click();
    cy.get('[data-cy="btn-add-to-cart"]').click();
    cy.wait(3000);
    cy.get('[data-cy="btn-cart"]').click();
  })

  it('should add a product in the cart', () => {
    expect(
        cy.get('[data-cy="product-card-checkout-1"]')
            .should('exist')
            .should('be.visible')
    );
  });

  it('should remove a product from the cart', () => {
    cy.get('[data-cy="btn-remove-product"]').click();

    expect(
        cy.get('[data-cy="empty-cart-component"]')
            .should('be.visible')
    );
  });

  it('should go to checkout and finish the order', () => {
    cy.get('[data-cy="btn-checkout"]').click();

    cy.get('[data-cy="input-address-title"]').type('Casa secundária');
    cy.get('input[name="cep"]').type('08552330').blur();
    cy.wait(1500);
    cy.get('[data-cy="input-address-number"]').type('636');
    cy.get('[data-cy="btn-next-step-shipping"]').click();

    cy.get('[data-cy="shipping-card-1"]').click();
    cy.get('[data-cy="btn-next-step-payment"]').click();
  });
})