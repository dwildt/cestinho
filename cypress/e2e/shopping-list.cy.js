describe('Cestinho - Shopping List App', () => {
  beforeEach(() => {
    cy.clearAppStorage()
    cy.visit('/')
  })

  it('should load the application correctly', () => {
    cy.get('h1').should('contain', 'Cestinho')
    cy.get('#add-item-btn').should('be.visible')
    cy.get('#pending-list').should('be.visible')
    cy.get('#total-items').should('contain', '0')
    cy.get('#total-weight').should('contain', '0')
  })

  it('should open add item modal when clicking add button', () => {
    cy.get('#add-item-btn').click()
    cy.get('#add-item-modal').should('be.visible')
    cy.get('#modal-item-name').should('be.visible')
    cy.get('#modal-item-quantity').should('be.visible')
    cy.get('#modal-item-weight').should('be.visible')
  })

  it('should add an item to the shopping list', () => {
    cy.addShoppingItem('Banana', 2, 0.5)
    cy.checkItemExists('Banana')
    cy.get('#total-items').should('contain', '2')
    cy.get('#total-weight').should('contain', '0.5')
  })

  it('should open settings modal', () => {
    cy.get('#settings-button').click()
    cy.get('#settings-modal').should('be.visible')
    cy.get('#modal-max-items').should('be.visible')
    cy.get('#modal-max-weight').should('be.visible')
  })

  it('should open integrations modal', () => {
    cy.get('#integrations-button').click()
    cy.get('#integrations-modal').should('be.visible')
    cy.get('#export-button').should('be.visible')
    cy.get('#import-button').should('be.visible')
  })

  it('should change language', () => {
    cy.get('.flag-btn[data-lang="en"]').click()
    cy.get('#app-title').should('not.contain', 'Cestinho')
    
    cy.get('.flag-btn[data-lang="pt"]').click()
    cy.get('#app-title').should('contain', 'Cestinho')
  })

  it('should persist data after page reload', () => {
    cy.addShoppingItem('Item Persistente', 2, 1.5)
    cy.reload()
    cy.checkItemExists('Item Persistente')
    cy.get('#total-items').should('contain', '2')
    cy.get('#total-weight').should('contain', '1.5')
  })

  it('should handle multiple items correctly', () => {
    cy.addShoppingItem('Item 1', 3, 2)
    cy.addShoppingItem('Item 2', 2, 1.5)
    
    cy.get('#total-items').should('contain', '5')
    cy.get('#total-weight').should('contain', '3.5')
  })
})