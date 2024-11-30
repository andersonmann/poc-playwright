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
    async fillLastName(lastName) {
        await this.page.locator('[data-test="lastName"]').fill(lastName);
    }

    /**
     * Preencher campo CEP
     */
    async fillZipCode(postalCode) {
        await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    }

    /**
     * Clica no botão continuar
     */
    async clickButtonContinue(postalCode) {
        await this.page.locator('[data-test="continue"]').click();
    }

    /**
     * Clica no botão terminar
     */
    async clickButtonFinish(postalCode) {
        await this.page.locator('[data-test="finish"]').click();
    }

}

module.exports = CheckoutPage;