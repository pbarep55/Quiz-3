describe('Quiz 3 Test Fitur Login', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-001: Login Berhasil dengan Username dan Password Valid', () => {
    cy.get('input[name="username"]').type('Admin') //
    cy.get('input[name="password"]').type('admin123')
    cy.get('.orangehrm-login-button').click() //
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('be.visible')
    })
  })