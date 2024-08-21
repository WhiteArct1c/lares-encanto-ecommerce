describe('Validates and create the customer credit cards', ()=>{
    beforeEach(() =>{
        cy.visit('/login');
        cy.get('input[name="email"]').type('matheusbispo@gmail.com');
        cy.get('input[name="password"]').type('Mat15777@');
        cy.contains('button', 'Entrar').click();
        cy.wait(1000);
        cy.visit('/my-cards');
    })

    it('Submit the create credit card with card number with 12 digits', () =>{
        cy.get('[data-cy="btn-add-new-card"]').click();
        cy.get('[data-cy="txt-card-number"]').type('123123123123');
        cy.get('[data-cy="txt-card-name"]').type('Matheus Bispo');
        cy.get('[data-cy="txt-card-code"]').type('123');
        cy.get('[data-cy="btn-confirm-add-card"]').click();

        expect(
            cy.contains('p', 'O número do cartão deve conter no mínimo 13 dígitos!').should('be.visible')
        );
    });

    it('Submit the create credit card with card number with 17 digits', () =>{
        cy.get('[data-cy="btn-add-new-card"]').click();
        cy.get('[data-cy="txt-card-number"]').type('123123123123123123');
        cy.get('[data-cy="txt-card-name"]').type('Matheus Bispo');
        cy.get('[data-cy="txt-card-code"]').type('123');
        cy.get('[data-cy="btn-confirm-add-card"]').click();

        expect(
            cy.contains('p', 'O número do cartão deve conter no máximo 16 dígitos!').should('be.visible')
        );
    });

    it('Submit the create credit card with an invalid flag', () =>{
        cy.get('[data-cy="btn-add-new-card"]').click();
        cy.get('[data-cy="txt-card-number"]').type('123123123123123123');
        cy.get('[data-cy="txt-card-name"]').type('Matheus Bispo');
        cy.get('[data-cy="txt-card-code"]').type('123');
        cy.get('[data-cy="btn-confirm-add-card"]').click();

        expect(
            cy.contains('p', 'Bandeira inválida').should('be.visible')
        );
    });

    it('Submit the first credit card without errors and verify if the card was created as the principal', () => {
        cy.get('[data-cy="btn-add-new-card"]').click();
        cy.get('[data-cy="txt-card-number"]').type('4450785366686585');
        cy.get('[data-cy="txt-card-name"]').type('Matheus Bispo');
        cy.get('[data-cy="txt-card-code"]').type('123');
        cy.get('[data-cy="btn-confirm-add-card"]').click();

        expect(
            cy.get('div[role="alert"]').contains('Cartão de crédito salvo com sucesso').should('be.visible')
        );        
    })

    it('Submit the second credit card without errors and verify if the card was created as the principal', () => {
        cy.get('[data-cy="btn-add-new-card"]').click();
        cy.get('[data-cy="txt-card-number"]').type('5220115754867330');
        cy.get('[data-cy="txt-card-name"]').type('Priscila Ferreira');
        cy.get('[data-cy="txt-card-code"]').type('222');
        cy.get('[data-cy="btn-confirm-add-card"]').click();

        expect(
            cy.get('div[role="alert"]').contains('Cartão de crédito salvo com sucesso').should('be.visible')
        );        
    })

})