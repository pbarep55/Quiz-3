describe ('Scenario Login Positive', () => {
    it('Fungsi login dengan username dan password valid', () => {
        //pergi ke link
        cy.visit('https://www.saucedemo.com/')

        //input username dan check validasi isi username
        cy.get('[data-test="username"]').type('error_user')
        cy.get('[data-test="username"]').should('have.value', 'error_user')

        //input password dan check validasi isi password menggunakan id
        cy.get('#password').type('secret_sauce')
        cy.get('#password').should('have.value', 'secret_sauce')
        cy.get('#login-button').click()

        // Assertion: Pastikan masuk ke halaman produk
        cy.url().should('include', 'inventory.html')
    })
})