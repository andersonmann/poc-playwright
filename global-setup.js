const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function globalSetup() {
    const authDir = path.join(__dirname, 'playwright', '.auth');
    fs.mkdirSync(authDir, { recursive: true });

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(process.env.BASE_URL);
    await page.fill('#user-name', process.env.TEST_USERNAME);
    await page.fill('#password', process.env.TEST_PASSWORD);
    await page.click('#login-button');
    await page.waitForURL('**/inventory.html');

    // Salva cookies e localStorage para reutilização nos testes
    await page.context().storageState({ path: path.join(authDir, 'user.json') });

    await browser.close();
}

module.exports = globalSetup;
