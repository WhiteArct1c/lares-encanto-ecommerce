import newData from '../../../fixtures/newDataEditCustomer.json';

describe('Edit Customer Info', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[name="email"]').type('matheusbispo@gmail.com');
        cy.get('input[name="password"]').type(newData.password);
        cy.contains('button', 'Entrar').click();
        cy.wait(1000);
        cy.visit('/my-profile');
    });

    it('Edit a customer info without errors', () => {
        cy.contains('button', 'Editar dados pessoais').click();
        cy.get('input[name="fullName"]').clear().type(newData.fullName);
        cy.get('input[name="cpf"]').clear().type(newData.CPF);
        cy.get(`input[name="gender"][value="${newData.gender}"]`).click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();

        expect(cy.contains('span', newData.fullName));
        expect(cy.get('[href="/my-profile"] > .MuiButtonBase-root').contains(newData.fullName));
        expect(cy.get('.css-1szadqj-MuiGrid2-root > :nth-child(1) > :nth-child(4)').contains(newData.CPF));
        expect(cy.get('.css-1szadqj-MuiGrid2-root > :nth-child(2) > :nth-child(4)').contains(newData.gender))
    });

    it('Edit a customer password without errors', () => {
        cy.contains('button', 'Alterar senha').click();
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
        cy.get('input[name="password"]').clear().type('Mat15777@');
        cy.get('input[name="confirmedPassword"]').clear().type('Mat15777@');
        newData.password = 'Mat15777@';
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();

        expect(cy.get('.Toastify__toast-body > :nth-child(2)').contains("Senha atualizada com sucesso!"))
    });

    it('Add a new address to the customer without errors', () => {
        cy.get('.css-j3sevo-MuiGrid2-root > .MuiButtonBase-root').click();
        cy.get('textarea[name="addressTitle"]').type('Endereço Secundário');
        cy.get('input[name="cep"]').type('08552330').blur();
        cy.wait(1500);
        cy.get('input[name="addressNumber"]').type('7070');
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();

        expect(cy.contains('p', 'Endereço Secundário'));
        expect(cy.contains('p', '7070'));
    });

    it('Edit a customer address without errors', () => {
        cy.get(':nth-child(2) > .css-92b3f1-MuiGrid2-root > .MuiBox-root > [aria-label="Editar endereço"]').click();
        cy.get('textarea[name="addressTitle"]').clear().type('Endereço Secundário Editado');
        cy.get('input[name="cep"]').clear().type('08554035').blur();
        cy.wait(1500);
        cy.get('input[name="addressNumber"]').clear().type('862');
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();

        expect(cy.contains('p', 'Endereço Secundário Editado'));
        expect(cy.contains('p', 'Mauro Piteli'));
        expect(cy.contains('p', 'Cidade Kemel'));
        expect(cy.contains('p', '08554035'));
        expect(cy.contains('p', '862'));
    });

    it('Delete a customer address without errors', () => {
        cy.get(':nth-child(1) > .css-92b3f1-MuiGrid2-root > .MuiBox-root > [aria-label="Excluir endereço"]').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();

        expect(
            cy.contains('p', 'Casa Principal')
                .should('not.exist')
        )
    });

    it('Inactivate a customer account', () => {
        cy.get('.MuiGrid2-grid-xs-12 > .MuiButton-text').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();

        cy.get('input[name="email"]').type('matheusbispo@gmail.com');
        cy.get('input[name="password"]').type(newData.password);
        cy.contains('button', 'Entrar').click();

        expect(
            cy.get('.Toastify__toast-body > :nth-child(2)')
                .should('be.visible')
                .should('have.text', 'Usuário está inativado! Consulte o administrador do sistema.')
        )
    });
})