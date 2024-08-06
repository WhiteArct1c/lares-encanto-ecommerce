describe('Create, edit and remove customer credit cards', ()=>{
    beforeEach(() =>{
        cy.visit('/login');
        cy.get('input[name="email"]').type('matheusbispo@gmail.com');
        cy.get('input[name="password"]').type('Mat15766@');
        cy.contains('button', 'Entrar').click();
        cy.wait(1000);
        cy.visit('/my-cards');
    })

    it('Submit the create credit card without fill the fields', () =>{
        cy.get('[data-cy="btn-add-new-card"]').click();
        cy.get('[data-cy="btn-confirm-add-card"]').click();

    })
})