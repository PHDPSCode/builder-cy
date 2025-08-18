/// <reference types="cypress" />

const user = 'admin';

describe('Validando Login', () => {
  before(() => {
    cy.acessarBuilder();
  });
  it('Verifica mensagem login com usuario incorreto', () => {
    cy.preencherUsuarioSenha('testwe', 'asdas');
    cy.intercept('*login/').as('logar');
    cy.clicarBotaoAcessar();
    cy.wait('@logar');
    cy.get('.font-medium').contains('Opa! Algo deu errado.');
  });
  it('Verifica login realizado com sucesso', () => {
    cy.preencherUsuarioSenha(user);
    cy.intercept('https://builderstudio-qa.smartlms.com.br/').as('entrar');
    cy.clicarBotaoAcessar();
    cy.wait('@entrar');
  });
  it('Valida login', () => {
    cy.get('.h-8').click();
    cy.get('.justify-end > .dropdown > .p-2 > div > :nth-child(1)').contains('Administrador REVVO');
  });
});
