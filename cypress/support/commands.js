// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for Cestinho app
Cypress.Commands.add('clearAppStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})

Cypress.Commands.add('addShoppingItem', (name, quantity = 1, weight = 1) => {
  // Abrir modal de adicionar item
  cy.get('#add-item-btn').click()
  
  // Aguardar modal aparecer
  cy.get('#add-item-modal').should('be.visible')
  
  // Preencher formulário
  cy.get('#modal-item-name').clear().type(name)
  cy.get('#modal-item-quantity').clear().type(quantity.toString())
  cy.get('#modal-item-weight').clear().type(weight.toString())
  
  // Submeter formulário
  cy.get('#modal-add-button').click()
  
  // Aguardar modal fechar
  cy.get('#add-item-modal').should('not.be.visible')
})

Cypress.Commands.add('checkItemExists', (itemName) => {
  cy.get('#pending-list')
    .should('contain', itemName)
})
