class LoginPage {
    constructor(page) {
       
       // this.errorMessage = '.error-message-container';
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    }

    async login(username, password) {

        await page.getByPlaceholder('username').fill(username)

        // await page.locator('[data-test="username"]').fill(username);
        await page.locator('[data-test="password"]').fill(password);
        await page.locator('[data-test="login-button"]').click();
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }
}

module.exports = { LoginPage };

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
});