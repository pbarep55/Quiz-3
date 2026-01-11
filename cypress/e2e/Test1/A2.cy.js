describe('Fitur Login OrangeHRM', () => {
  
  // Menjalankan perintah ini sebelum setiap test case
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC-01: Login Berhasil dengan Kredensial Valid', () => {
    cy.get('input[name="username"]').type('Admin') //
    cy.get('input[name="password"]').type('admin123')
    cy.get('.orangehrm-login-button').click() //
    
    // Assertion: Memastikan diarahkan ke dashboard
    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('be.visible')
  })

  it('TC-02: Login Gagal dengan Password Salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('.orangehrm-login-button').click()
    
    // Assertion: Muncul pesan error
    cy.get('.oxd-alert-content').should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-03: Login Gagal dengan Username Salah', () => {
    cy.get('input[name="username"]').type('UserSalah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('.orangehrm-login-button').click()
    
    // Assertion: Muncul pesan error
    cy.get('.oxd-alert-content').should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('TC-04: Login Gagal dengan Field Kosong', () => {
    // Langsung klik login tanpa isi input
    cy.get('.orangehrm-login-button').click()
    
    // Assertion: Muncul validasi "Required" di bawah input
    cy.get('.oxd-input-group__message').should('have.length', 2)
      .and('contain', 'Required')
  })

  it('TC-05: Verifikasi Tautan Forgot Password', () => {
    cy.get('.orangehrm-login-forgot-header').click() //
    
    // Assertion: Berpindah ke halaman reset password
    cy.url().should('include', '/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
  })

})