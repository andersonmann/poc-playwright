const { test, expect } = require('@playwright/test');
const LoginPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/loginPage')

test.describe('Login Tests', () => {

    test('Login com credenciais válidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    })

    test('Login com credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    })
});