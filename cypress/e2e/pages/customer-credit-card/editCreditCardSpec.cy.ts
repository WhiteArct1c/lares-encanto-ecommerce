describe('Validates and create the customer credit cards', ()=>{
   beforeEach(() =>{
      cy.visit('/login');
      cy.get('input[name="email"]').type('matheusbispo@gmail.com');
      cy.get('input[name="password"]').type('Mat15777@');
      cy.contains('button', 'Entrar').click();
      cy.wait(1000);
      cy.visit('/my-cards');
   })

   it('Edit the credit card without errors and disable the main card flag', () =>{
      cy.get('.css-1nm3umx-MuiPaper-root-MuiCard-root > [data-cy="credit-card-header"] > .MuiCardHeader-action > .MuiButtonBase-root').click();
      cy.get('[data-cy="cc-submenu-edit"]').click();

      cy.get('[data-cy="txt-card-number"]').clear().type('5117913763830745');
      cy.get('[data-cy="txt-card-name"]').clear().type('João Marques');
      cy.get('[data-cy="txt-card-code"]').clear().type('455');

      cy.get('[data-cy="switcher-main-card"]').click();
      cy.get('[data-cy="btn-confirm-add-card"]').click();

      expect(
         cy.get('div[role="alert"]').contains('Ao menos um cartão deve ser principal')
            .should('be.visible')
            .should('have.text', 'Ao menos um cartão deve ser principal - ')
     );  
   })

   it('Edit the credit card without errors', () => {
      cy.get('.css-1nm3umx-MuiPaper-root-MuiCard-root > [data-cy="credit-card-header"] > .MuiCardHeader-action > .MuiButtonBase-root').click();
      cy.get('[data-cy="cc-submenu-edit"]').click();

      cy.get('[data-cy="txt-card-number"]').clear().type('5117913763830745');
      cy.get('[data-cy="txt-card-name"]').clear().type('João Marques');
      cy.get('[data-cy="txt-card-code"]').clear().type('455');

      cy.get('[data-cy="btn-confirm-add-card"]').click();

      expect(
         cy.get('div[role="alert"]').contains('Cartão de crédito atualizado com sucesso!')
            .should('be.visible')
            .should('have.text', 'Cartão de crédito atualizado com sucesso!')
     );  
   })
})