import './utils'

const { SELECTORS } = require('../support/utils');

Cypress.Commands.add('acessarBuilder', () => {
  cy.clearCookies();
  cy.intercept('*login/').as('logar');
  cy.visit('/');
  cy.wait('@logar');
});

Cypress.Commands.add('realizarLogin', (
  perfil = 'administrador',
) => {
  cy.acessarBuilder();
  cy.clicarBotaoLogar();
});

Cypress.Commands.add('clicarBotaoAcessar', () => {
  cy.get('.btn-primary').contains('Acessar').click();
});

Cypress.Commands.add('preencherUsuarioSenha', (
    user = 'admin',
    password = 'Senha@123'
) => {
  cy.get(SELECTORS.userInput).type(`{selectall}{del}${user}`);
  cy.get(SELECTORS.passwordInput).type(`{selectall}{del}${password}`);
});