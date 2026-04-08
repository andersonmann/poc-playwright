class CartPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Remove um item do carrinho pelo seu slug.
     * O slug corresponde ao nome do produto em lowercase com espaços substituídos por hífens.
     * Exemplo: 'Sauce Labs Bike Light' -> 'sauce-labs-bike-light'
     *
     * @param {string} itemSlug - Slug do item a ser removido.
     */
    async removeItem(itemSlug) {
        await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
    }

    /**
     * Continuar comprando
     */
    async continueShooping() {
        await this.page.locator('[data-test="continue-shopping"]').click();
    }

    /**
     * Checkout
     */
    async accessCheckout() {
        await this.page.locator('[data-test="checkout"]').click();
    }
}

module.exports = CartPage;
