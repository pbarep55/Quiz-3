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
    interceptDashboard(){
        cy.intercept('Get', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
    }
    waitForDashboard(){
       cy.wait('@actionSummary')
      .its('response.statusCode')
      .should('eq', 200)
    }
    interceptValidate(){
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('actionSummary')
    }
    waitForValidate(){
       cy.wait('@actionSummary')
      .its('response.statusCode')
      .should('eq', 302)
    }
    interceptResetPassword(){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('actionSummary')
    }
    waitForResetPassword(){
       cy.wait('@actionSummary')
      .its('response.statusCode')
      .should('eq', 200)
    }
    cancelResetPassword(){
        cy.get('.orangehrm-forgot-password-button--cancel').click()
        cy.url().should('include', '/login')
        cy.get('.orangehrm-login-title').should('have.text', 'Login')
    }
    interceptCancelResetPassword(){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('actionSummary')
    }
    waitForCancelResetPassword(){
       cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
    }
    menuDirectory(){
       cy.contains('.oxd-main-menu-item', 'Directory').click()
    }
    assertionDirectory(){
        cy.url().should('include', '/directory/viewDirectory')
    }
    intercpetDirectory(){
        cy.intercept('GET', '**/web/index.php/directory/viewDirectory').as('actionSummary')
    }
    waitForDirectory(){
       cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
    }
    inputSearchNameDirectory(SearcNameDirectory){
        cy.get('.oxd-autocomplete-text-input > input').type(SearcNameDirectory)
        cy.get('.oxd-autocomplete-dropdown').contains('Rebecca Harmony').click()
    }
    selectJobTitleDirectory(searchJobtitle){
        cy.contains('.oxd-input-group', 'Job Title').find('.oxd-select-text').click()       
        cy.get('.oxd-select-dropdown').contains(searchJobtitle).click()
    }
    selectLocation(searchLocation){
        cy.contains('.oxd-input-group', 'Location').find('.oxd-select-text').click() 
        cy.get('.oxd-select-dropdown').contains(searchLocation).click()
    }
    clickSearch() {
    cy.get('button[type="submit"]').click()
    }
    interceptSearchDirectory() {
    cy.intercept('GET', '**/directory/employees*').as('directorySearch')
    }
    waitForSearchDirectory() {
    cy.wait('@directorySearch').its('response.statusCode').should('eq', 200)
    }
    clickResetSearch() {
    cy.get('button[type="reset"]').click()
    }
    interceptResetSearchDirectory() {
    cy.intercept('GET', '**/directory/employees*').as('directorySearch')
    }
    waitForResetSearchDirectory() {
    cy.wait('@directorySearch').its('response.statusCode').should('eq', 200)
    }
    viewDetailEmployee(employeeDetail) {
    cy.get('.orangehrm-directory-card-header').contains(employeeDetail).click()
    }
    backFromViewDetailEmployee() {
    cy.get('.orangehrm-corporate-directory-sidebar > .oxd-grid-item > .oxd-sheet > .orangehrm-directory-card-top > .oxd-icon').click()
    }
    copyWorkTelephoneFromViewDetailEmployee() {
    cy.contains('.orangehrm-directory-card-hover', 'Work Telephone').should('be.visible').find('button').click({ force: true })
    }
}
export default new loginPage()