class InventoryPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    }

    /**
     * Clica em um item pelo nome.
     *
     * @param {string} itemName - Nome do item a ser clicado.
     */
    async clickOnItemByName(itemName) {
        await this.page.getByTestId('inventory-item-name').filter({ hasText: itemName }).click();
    }

    /**
     * Adiciona o item no carrinho
     */
    async addItemToCart() {
        await this.addToCartButton.click();
    }

    /**
     * Acessa o carrinho a partir da tela de detalhes do item
     */
    async accessCart() {
        await this.shoppingCartLink.click();
    }
}
module.exports = InventoryPage;
