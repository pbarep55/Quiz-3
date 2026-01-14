class loginPage {
    visitlogin(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    inputUsername(username){
        cy.get('input[name="username"]').type(username)
    }
    inputPassword(password){
        cy.get('input[name="password"]').type(password)
    }
    loginButton(){
        cy.get('.orangehrm-login-button').click()
    }
    assertionLogin(){
        cy.url().should('include', '/dashboard')
    }
    invalidCredentials(){
        cy.get('.oxd-alert-content').should('be.visible')
        .and('contain', 'Invalid credentials')
    }
    requiredLogin(){
        cy.get('.oxd-input-group__message').should('have.length', 2)
        .and('contain', 'Required')
    }
    forgotPassword(){
        cy.get('.orangehrm-login-forgot-header').click()
        cy.url().should('include', '/requestPasswordResetCode')
        cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
    }
}
export default new loginPage()