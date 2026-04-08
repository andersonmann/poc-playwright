class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.getByTestId('error');
    }

    /**
     * Realiza o login na aplicação com as credenciais fornecidas.
     *
     * @param {string} username - O nome de usuário a ser usado no login.
     * @param {string} password - A senha correspondente ao nome de usuário.
     * @returns {Promise<void>} Não retorna valor, mas realiza a navegação após o login.
     */
    async login(username, password) {
        await this.page.goto('/');
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Método para obter mensagens de erro
    async getErrorMessage() {
        return this.errorMessage.textContent();
    }

    // Método para verificar se o login foi bem-sucedido
    async isLoggedIn() {
        // Aguarda até que a URL da página de inventário seja carregada
        await this.page.waitForURL('**/inventory.html');
        return this.page.url().includes('/inventory.html');
    }
}
module.exports = LoginPage;
