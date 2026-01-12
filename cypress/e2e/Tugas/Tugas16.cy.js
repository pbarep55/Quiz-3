describe('Tugas 16 - Intercept', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-001: Login Berhasil dengan Username dan Password Valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    // Menangkap request ke URL yang dituju
    // Intercept ke 1
    cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
    cy.get('.orangehrm-login-button').click()
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('be.visible')
  })

  it('TC-002: Login Gagal dengan Password Salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    // Intercept ke 2
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('actionSummary')
    cy.get('.orangehrm-login-button').click()
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 302)
    cy.get('.oxd-alert-content').should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-003: Login Gagal dengan Username Salah', () => {
    cy.get('input[name="username"]').type('UserSalah')
    cy.get('input[name="password"]').type('admin123')
    // Intercept ke 3
    cy.intercept('POST', '**/web/index.php/auth/validate').as('actionSummary')
    cy.get('.orangehrm-login-button').click()
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 302)
    cy.get('.oxd-alert-content').should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-004: Login Gagal dengan Field Kosong', () => {
    cy.get('.orangehrm-login-button').click()
    cy.get('.oxd-input-group__message').should('have.length', 2)
      .and('contain', 'Required')
  })

  it('TC-005: Verifikasi Tautan Forgot Password', () => {
    // Intercept ke 4
    cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('actionSummary')
    cy.get('.orangehrm-login-forgot-header').click()
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
  })

  it('TC-006: Cancel Verifikasi Tautan Forgot Password', () => {
    cy.get('.orangehrm-login-forgot-header').click()
    cy.url().should('include', '/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
    // Intercept ke 5
    cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('actionSummary')
    cy.get('.orangehrm-forgot-password-button--cancel').click()
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/login')
    cy.get('.orangehrm-login-title').should('have.text', 'Login')

  })
})