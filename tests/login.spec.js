const { test, expect } = require('@playwright/test');

const LoginPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/loginPage'); // Importa a classe LoginPage

test.describe('Login Tests', () => {
    test('Login com credenciais válidas', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Navegar para a página
        await loginPage.navigate();

        // Realizar login com credenciais válidas
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });

    test('Login com credenciais inválidas', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Navegar para a página
        await loginPage.navigate();

        // Realizar login com credenciais inválidas
        await loginPage.login('invalid_user', 'invalid_password');

        // Verificar mensagem de erro
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
    });
});
