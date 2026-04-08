const { test, expect } = require('./fixtures');
require('dotenv').config();

// Testes de login precisam de contexto limpo, sem estado de autenticação pré-carregado
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {
    test('Login com credenciais válidas', async ({ loginPage }) => {
        await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });

    test('Login com credenciais inválidas', async ({ loginPage }) => {
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
