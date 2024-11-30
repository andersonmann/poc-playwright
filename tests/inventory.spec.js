const { test, expect } = require('@playwright/test');

const LoginPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/LoginPage')
const InventoryPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/InventoryPage')
const CartPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/cartPage')
const CheckoutPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/checkoutPage')

const SalePage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/salePage')


test.describe('Usando PageObjects', () => {
    test('Seleciona um item e adiciona no carrinho', async ({ page }) => {
        const salePage = new SalePage(page);
        const inventoryPage = new InventoryPage(page);

        await salePage.sale('Sauce Labs Bike Light');
        await inventoryPage.clickOnItemByName('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
        await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.');
        await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');

     });
})


// test.describe('Cart Tests', () => {

//     test('Seleciona um item e adiciona no carrinho', async ({ page }) => {
//         const loginPage = new LoginPage(page);
//         const inventoryPage = new InventoryPage(page);
//         const cartPage = new CartPage(page);
//         const checkoutPage = new CheckoutPage(page);

//         await loginPage.login('standard_user', 'secret_sauce');
//         await inventoryPage.clickOnItemByName('Sauce Labs Bike Light');
//         await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
//         await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.');
//         await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
//         await inventoryPage.addItemToCart();
//         await inventoryPage.accessCart();
//         await cartPage.accessCheckout();
//         await checkoutPage.fillFirstName('Anderson');
//         await checkoutPage.fillLastName('Mann');
//         await checkoutPage.fillZipCode('91280350');
//         await checkoutPage.clickButtonContinue();
//         await checkoutPage.clickButtonFinish();
//         await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!')

//     });
// })

// test.describe('Teste ponta a ponta', () => {

//     test('test', async ({ page }) => {
//         await page.goto('https://www.saucedemo.com/');

//         await page.locator('[data-test="username"]').fill('standard_user');
//         await page.locator('[data-test="password"]').fill('secret_sauce');
//         await page.locator('[data-test="login-button"]').click();
//         await page.locator('[data-test="item-4-title-link"]').click();
//         await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
//         await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
//         await page.locator('[data-test="add-to-cart"]').click();
//         await page.locator('[data-test="shopping-cart-link"]').click();
//         await page.locator('[data-test="checkout"]').click();
//         await page.locator('[data-test="firstName"]').fill('anderson');
//         await page.locator('[data-test="lastName"]').fill('mann');
//         await page.locator('[data-test="postalCode"]').fill('91290350');
//         await page.locator('[data-test="continue"]').click();
//         await page.locator('[data-test="finish"]').click();
//         await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

//     });
// })