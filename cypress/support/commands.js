// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Simple command to clear app storage
Cypress.Commands.add('clearAppStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})