describe('Register Customer', () => {
  beforeEach(() => {
    cy.visit('/register-user');
  });

  it('Submit the register form without fill the inputs and verify the error messages to the required fields', () => {
    cy.contains('button', 'Cadastrar').click();

    expect(cy.contains('p', 'O nome completo é obrigatório.'));
    expect(cy.contains('p', 'O CPF é obrigatório.'));
    expect(cy.contains('p', 'A data de nascimento é obrigatória'));
    expect(cy.contains('p', 'O número de telefone celular é obrigatório'));
    expect(cy.contains('p', 'O email é obrigatório'));
    expect(cy.contains('p', 'A senha é obrigatória.'));
    expect(cy.contains('p', 'O título do endereço é obrigatório'));
    expect(cy.contains('p', 'O CEP é obrigatório'));
    expect(cy.contains('p', 'O Logradouro é obrigatório'));
    expect(cy.contains('p', 'O Número é obrigatório'));
    expect(cy.contains('p', 'O Bairro é obrigatório'));
    expect(cy.contains('p', 'A Cidade é obrigatória'));
    expect(cy.contains('p', 'O Estado é obrigatório'));
  });

  it('Submit the register form with a invalid password', () => {

    cy.get('input[name="password"]').type('Mat15766@');
    cy.get('input[name="confirmedPassword"]').type('Mat15766');
    cy.contains('button', 'Cadastrar').click();

    expect(cy.contains('p', 'As senhas devem ser iguais!'));

  });

  it('Register a customer with no errors and validate if was really created', () => {
    cy.get('input[name="fullName"]').type('Matheus Rodrigues Bispo');
    cy.get('input[name="cpf"]').type('67787126000');
    cy.get('input[name="birthDate"]').click();
    cy.get('input[name="birthDate"]').type('1999-06-25');
    cy.get('input[name="phone"]').type('11950691542');
    cy.get('input[name="gender"][value="MASCULINO"]').click();
    cy.get('input[name="email"]').type(`matheusbispo@gmail.com`);
    cy.get('input[name="password"]').type('Mat15766@');
    cy.get('input[name="confirmedPassword"]').type('Mat15766@');
    cy.get('textarea[name="addressTitle"]').type('Casa Principal');
    cy.get('input[name="cep"]').type('08552330').blur();
    cy.wait(1500);
    cy.get('input[name="addressNumber"]').type('635');
    cy.wait(1500);
    cy.contains('button', 'Cadastrar').click();

    expect(cy.get('div[role="alert"]').contains('Cadastro concluído com sucesso'));

    //validate if the new user was created
    cy.get('input[name="email"]').type('matheusbispo@gmail.com');
    cy.get('input[name="password"]').type('Mat15766@');
    cy.contains('button', 'Entrar').click();

    expect(cy.get('div[role="alert"]').contains('Login efetuado com sucesso!'));
  });
})