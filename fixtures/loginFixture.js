const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

// Cria a fixture
const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

module.exports = { test };