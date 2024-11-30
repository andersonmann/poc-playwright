const { test, expect } = require('@playwright/test');
const SalesPage = require('../pages/salesPage')


test.describe('Realiza a compra de um produto com sucesso', () => {
    test('Seleciona um item e adiciona no carrinho', async ({ page }) => {
        const salesPage = new SalesPage(page);

        await salesPage.sale('Sauce Labs Bike Light', 'Anderson', 'Mann', '91280350');
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.');
        await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
        await salesPage.finishSale();
        await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!')
    });
})