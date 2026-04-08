class CartPage {
    constructor(page) {
        this.page = page;
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');
    }

    /**
     * Remove um item do carrinho pelo seu slug.
     * O slug corresponde ao nome do produto em lowercase com espaços substituídos por hífens.
     * Exemplo: 'Sauce Labs Bike Light' -> 'sauce-labs-bike-light'
     *
     * @param {string} itemSlug - Slug do item a ser removido.
     */
    async removeItem(itemSlug) {
        await this.page.getByTestId(`remove-${itemSlug}`).click();
    }

    /**
     * Continuar comprando
     */
    async continueShooping() {
        await this.continueShoppingButton.click();
    }

    /**
     * Checkout
     */
    async accessCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;
