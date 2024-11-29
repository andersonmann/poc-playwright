class LoginPage {
    constructor(page) {
        this.page = page; // Instância do Playwright Page

        // Seletores
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }
    /**
     * Método para navegar até a página
     */
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    /**
     * Realiza o login na aplicação com as credenciais fornecidas.
     * 
     * @param {string} username - O nome de usuário a ser usado no login.
     * @param {string} password - A senha correspondente ao nome de usuário.
     * @returns {Promise<void>} Não retorna valor, mas realiza a navegação após o login.
     */
    async login(username, password) {
        this.navigate();
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    // Método para obter mensagens de erro
    async getErrorMessage() {
        return this.page.textContent(this.errorMessage);
    }

    // Método para verificar se o login foi bem-sucedido
    async isLoggedIn() {
        // Aguarda até que a URL da página de inventário seja carregada
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
        return this.page.url() === 'https://www.saucedemo.com/inventory.html';
    }
}

module.exports = LoginPage;