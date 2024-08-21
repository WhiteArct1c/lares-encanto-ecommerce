describe('Validates and delete the customer credit cards', ()=>{
   beforeEach(() =>{
      cy.visit('/login');
      cy.get('input[name="email"]').type('matheusbispo@gmail.com');
      cy.get('input[name="password"]').type('Mat15777@');
      cy.contains('button', 'Entrar').click();
      cy.wait(1000);
      cy.visit('/my-cards');
   })

   it('Delete the main credit card without errors and verify if the new main card exists', () =>{
      cy.get('.css-1nm3umx-MuiPaper-root-MuiCard-root > [data-cy="credit-card-header"] > .MuiCardHeader-action > .MuiButtonBase-root').click();
      cy.get('[data-cy="cc-submenu-delete"]').click();
      cy.get('[data-cy="btn-confirm-delete-card"]').click();

      expect(
         cy.get('div[role="alert"]').contains('Cartão de crédito excluído com sucesso!')
            .should('be.visible')
            .should('have.text', 'Cartão de crédito excluído com sucesso!')
      );
     
      expect(
         cy.get('.MuiChip-label').contains('Principal')
            .should('be.visible')
            .should('have.text', 'Principal')
      );
   })

   it('Delete the only main credit card', () =>{
      cy.get('.css-1nm3umx-MuiPaper-root-MuiCard-root > [data-cy="credit-card-header"] > .MuiCardHeader-action > .MuiButtonBase-root').click();
      cy.get('[data-cy="cc-submenu-delete"]').click();
      cy.get('[data-cy="btn-confirm-delete-card"]').click();

      expect(
         cy.get('div[role="alert"]').contains('Cartão de crédito excluído com sucesso!')
            .should('be.visible')
            .should('have.text', 'Cartão de crédito excluído com sucesso!')
     );
   })
})