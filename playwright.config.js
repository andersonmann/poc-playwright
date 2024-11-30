const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  reporter: [['html', { outputFolder: 'playwright-report' }]],

  use: {
    headless: false, // Para depuração, exibe o navegador.
    baseURL: 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure', // Tira screenshots somente em falhas.
    video: 'retain-on-failure',   // Grava vídeos apenas em falhas.
  },
});
