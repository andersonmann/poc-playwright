class CartPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Remover 
     */
    async removeItem() { // ESTÁ FIXO, PRECISA REFATORAR
        await this.page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

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