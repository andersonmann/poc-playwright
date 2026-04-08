const { expect } = require('@playwright/test');
const { test } = require('./fixtures');
const { Faker, pt_BR } = require('@faker-js/faker');
const { POSTAL_CODES } = require('./data/checkout.data');

const faker = new Faker({ locale: [pt_BR] });

test.describe('Realiza a compra de um produto com sucesso', () => {
    test('Loga do site, seleciona um item, adiciona no carrinho, digita dados usuario e finaliza compra', async ({
        page,
        inventoryPage,
        cartPage,
        checkoutPage,
    }) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const postalCode = faker.helpers.arrayElement(POSTAL_CODES);

        await page.goto('/inventory.html');
        await inventoryPage.clickOnItemByName('Sauce Labs Bike Light');
        await inventoryPage.addItemToCart();
        await inventoryPage.accessCart();
        await cartPage.accessCheckout();
        await checkoutPage.fillFirstName(firstName);
        await checkoutPage.fillLastName(lastName);
        await checkoutPage.fillZipCode(postalCode);
        await checkoutPage.clickButtonContinue();
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(
            'Sauce Labs Bike Light'
        );
        await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText(
            "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
        );
        await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
        await checkoutPage.clickButtonFinish();
        await expect(page.locator('[data-test="complete-header"]')).toContainText(
            'Thank you for your order!'
        );
    });
});
