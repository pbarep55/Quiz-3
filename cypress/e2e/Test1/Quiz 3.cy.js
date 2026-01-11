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

  it('TC-002: Login Gagal dengan Password Salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('.orangehrm-login-button').click()
    cy.get('.oxd-alert-content').should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-003: Login Gagal dengan Username Salah', () => {
    cy.get('input[name="username"]').type('UserSalah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('.orangehrm-login-button').click()
    cy.get('.oxd-alert-content').should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-004: Login Gagal dengan Field Kosong', () => {
    cy.get('.orangehrm-login-button').click()
    cy.get('.oxd-input-group__message').should('have.length', 2)
      .and('contain', 'Required')
  })

  it('TC-005: Verifikasi Tautan Forgot Password', () => {
    cy.get('.orangehrm-login-forgot-header').click() //
    cy.url().should('include', '/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
  })

})