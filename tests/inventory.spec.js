const { test, expect } = require('@playwright/test');

const LoginPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/loginPage')
const InventoryPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/inventoryPage')


test.describe('Cart Tests', () => {

    test('Seleciona um item e adiciona no carrinho', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.clickOnItemByName('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.');
        await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
        await inventoryPage.addItemToCart();
        await inventoryPage.accessCart();
    })
});