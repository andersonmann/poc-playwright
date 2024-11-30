const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');

class SalesPage {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }

    /**
     * Esse metodo implenta as ações necessárias para a realização da compra de um item.
     * 
     * @param {string} itemName - O nome do item a ser adicionado ao carrinho.
     * @param {string} firstName - Primeiro nome do cliente.
     * @param {string} lastName - Ultimo nome do cliente.
     * @param {string} postalCode - CEP do cliente.
     * @returns {Promise<void>} Não retorna valor, mas realiza a navegação após o login.
     */
    async sale(itemName, firstName, lastName, postalCode) {
        await this.loginPage.login('standard_user', 'secret_sauce')
        await this.inventoryPage.clickOnItemByName(itemName)
        await this.inventoryPage.addItemToCart();
        await this.inventoryPage.accessCart();
        await this.cartPage.accessCheckout();
        await this.checkoutPage.fillFirstName(firstName);
        await this.checkoutPage.fillLastName(lastName);
        await this.checkoutPage.fillZipCode(postalCode);
        await this.checkoutPage.clickButtonContinue();       
    }

    /**
     * Metodo auxiliar para evocar o metodo implementado na classe CheckoutPage
     * usando essa alternativa, evitamos a instanciação da classa nas classes de testes.
     */
    async finishSale(){
        await this.checkoutPage.clickButtonFinish();
    }
}
module.exports = SalesPage;