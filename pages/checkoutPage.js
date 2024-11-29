class CheckoutPage {
    constructor(page) {
        this.page = page;
    }


    /**
     * Preencher campo primeiro nome
     */
    async fillFirstName(firstName) {
        await this.page.locator('[data-test="firstName"]').fill(firstName);
    }

    /**
     * Preencher campo ultimo nome
     */
    async fillFirstName(lastName) {
        await this.page.locator('[data-test="lasttName"]').fill(lastName);
    }

    /**
     * Preencher campo CEP
     */
    async fillFirstName(postalCode) {
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    /**
     * Clica no botão continuar
     */
    async fillFirstName(postalCode) {
        await this.page.locator('[data-test="continue"]').click();
    }

    /**
     * Clica no botão terminar
     */
    async fillFirstName(postalCode) {
        await this.page.locator('[data-test="finish"]').click();
    }
}