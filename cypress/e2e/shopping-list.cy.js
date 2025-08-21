describe('Cestinho - Shopping List App', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(3000) // Aguardar carregamento completo
  })

  it('should load the page successfully', () => {
    cy.get('h1').should('contain', 'Cestinho')
    cy.get('body').should('be.visible')
  })

  it('should have basic UI elements', () => {
    cy.get('#app-title').should('be.visible')
    cy.get('.language-selector').should('be.visible')
  })

  it('should change language', () => {
    cy.get('.flag-btn[data-lang="en"]').click()
    cy.wait(1000)
    
    cy.get('.flag-btn[data-lang="pt"]').click()
    cy.wait(1000)
    cy.get('#app-title').should('contain', 'Cestinho')
  })

  it('should open settings modal', () => {
    cy.get('#settings-button').should('be.visible').click()
    cy.get('#settings-modal').should('be.visible')
    
    // Fechar modal
    cy.get('#cancel-settings').click()
    cy.get('#settings-modal').should('not.be.visible')
  })

  it('should open integrations modal', () => {
    cy.get('#integrations-button').should('be.visible').click()
    cy.get('#integrations-modal').should('be.visible')
    
    // Fechar modal
    cy.get('#close-integrations-btn').click()
    cy.get('#integrations-modal').should('not.be.visible')
  })
})