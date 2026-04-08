const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    globalSetup: './global-setup.js', // Executa login uma vez e salva o estado de autenticação.

    timeout: 30000, // Timeout máximo por teste (ms).
    retries: process.env.CI ? 2 : 0, // Em CI, re-executa testes falhos até 2 vezes.

    reporter: [['html', { outputFolder: 'playwright-report' }]],

    use: {
        headless: process.env.CI ? true : false, // Em CI executa headless; localmente exibe o navegador.
        baseURL: 'https://www.saucedemo.com/',
        storageState: 'playwright/.auth/user.json', // Reutiliza estado de autenticação em todos os testes.
        testIdAttribute: 'data-test', // Permite usar page.getByTestId() com o atributo data-test.
        screenshot: 'only-on-failure', // Tira screenshots somente em falhas.
        video: 'retain-on-failure', // Grava vídeos apenas em falhas.
        trace: 'on-first-retry', // Grava trace na primeira re-execução de um teste falho.
    },

    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
