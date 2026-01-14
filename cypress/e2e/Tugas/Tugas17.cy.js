import loginPage from "../../support/Tugas17"
import loginData from "../../fixtures/Tugas17Data.json"

describe('Tugas 17 - Login with POM', () => {
    it('TC-001: Login Berhasil dengan Username dan Password Valid', () => {
    loginPage.visitlogin()
    loginPage.inputUsername(loginData.validUsername)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.loginButton()
    loginPage.assertionLogin()
 })
    it('TC-002: Login gagal dengan Password invalid', () => {
    loginPage.visitlogin()
    loginPage.inputUsername(loginData.validUsername)
    loginPage.inputPassword(loginData.invalidPassword)
    loginPage.loginButton()
    loginPage.invalidCredentials()
 })
    it('TC-003: Login gagal dengan Username invalid', () => {
    loginPage.visitlogin()
    loginPage.inputUsername(loginData.invalidUsername)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.loginButton()
    loginPage.invalidCredentials()
 })
    it('TC-004: Login gagal dengan field kosong', () => {
    loginPage.visitlogin()
    loginPage.loginButton()
    loginPage.requiredLogin()
 })
    it('TC-005: Verifikasi Tautan Forgot Password', () => {
    loginPage.visitlogin()
    loginPage.forgotPassword()
 })
})