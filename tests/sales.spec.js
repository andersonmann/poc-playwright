const { expect } = require('@playwright/test');
const { test } = require('./fixtures');
const { faker } = require('@faker-js/faker/locale/pt_BR');
const { POSTAL_CODES } = require('./data/checkout.data');

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

        await test.step('Selecionar item e adicionar ao carrinho', async () => {
            await inventoryPage.clickOnItemByName('Sauce Labs Bike Light');
            await inventoryPage.addItemToCart();
            await inventoryPage.accessCart();
        });

        await test.step('Preencher dados de checkout', async () => {
            await cartPage.accessCheckout();
            await checkoutPage.fillFirstName(firstName);
            await checkoutPage.fillLastName(lastName);
            await checkoutPage.fillZipCode(postalCode);
            await checkoutPage.clickButtonContinue();
        });

        await test.step('Validar resumo do pedido', async () => {
            await expect(page.getByTestId('inventory-item-name')).toContainText(
                'Sauce Labs Bike Light'
            );
            await expect(page.getByTestId('inventory-item-desc')).toContainText(
                "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
            );
            await expect(page.getByTestId('inventory-item-price')).toContainText('$9.99');
        });

        await test.step('Finalizar compra', async () => {
            await checkoutPage.clickButtonFinish();
            await expect(page.getByTestId('complete-header')).toContainText(
                'Thank you for your order!'
            );
        });
    });
});