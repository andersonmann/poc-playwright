class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.zipCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
    }

    /**
     * Preencher campo primeiro nome
     */
    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Preencher campo ultimo nome
     */
    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Preencher campo CEP
     */
    async fillZipCode(postalCode) {
        await this.zipCodeInput.fill(postalCode);
    }

    /**
     * Clica no botão continuar
     */
    async clickButtonContinue() {
        await this.continueButton.click();
    }

    /**
     * Clica no botão terminar
     */
    async clickButtonFinish() {
        await this.finishButton.click();
    }
}

module.exports = CheckoutPage;
