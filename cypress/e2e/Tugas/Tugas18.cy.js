describe('Tugas 18 - API Testing', () => {
    const authHeaders = {
        "x-api-key": "reqres_di isi api key"
    }

    it('TC 001 - GET - Single User', () => {
        cy.request({
            method : 'GET', 
            url: 'https://reqres.in/api/users/2',
            headers: authHeaders
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
        })
    })

    it('TC 002 - GET - List User', () => {
        cy.request({
            method : 'GET', 
            url: 'https://reqres.in/api/users?page=2',
            headers: authHeaders
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
        })
    })

    it('TC 003 - POST - Create User', () => {
        cy.request({
            method : 'POST', 
            url: 'https://reqres.in/api/users',
            headers: authHeaders,
            body :{
                "name": "morpheus",
                "job": "leader"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
        })
    })

    it('TC 004 - PUT - Update User', () => {
        cy.request({
            method : 'PUT', 
            url: 'https://reqres.in/api/users/2',
            headers: authHeaders,
            body :{
                "name": "morpheus",
                "job": "President"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
        })
    })

    it('TC 005 - PATCH - Update User', () => {
        cy.request({
            method : 'PATCH', 
            url: 'https://reqres.in/api/users/2',
            headers: authHeaders,
            body :{
                "name": "morpheus",
                "job": "President"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
        })
    })

    it('TC 006 - DELETE - Update User', () => {
        cy.request({
            method : 'DELETE', 
            url: 'https://reqres.in/api/users/2',
            headers: authHeaders
        })
        .then((response) => {
            expect(response.status).to.eq(204)
        })
    })

    it('TC 007 - POST - Login User', () => {
        cy.request({
            method : 'POST', 
            url: 'https://reqres.in/api/login',
            headers: authHeaders,
            body :{
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
        })
    })

    it('TC 008 - POST - Register User', () => {
        cy.request({
            method : 'POST', 
            url: 'https://reqres.in/api/register',
            headers: authHeaders,
            body :{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
        })
    })

    it('TC 009 - GET - User Not Found', () => {
        cy.request({
            method : 'GET', 
            url: 'https://reqres.in/api/users/23',
            headers: authHeaders,
            failOnStatusCode: false
            })
        .then((response) => {
            expect(response.status).to.eq(404)
        })
    })
})