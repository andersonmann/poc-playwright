class LoginPage {
    constructor(page) {
      this.page = page; // Instância do Playwright Page
  
      // Seletores
      this.usernameInput = '#user-name';
      this.passwordInput = '#password';
      this.loginButton = '#login-button';
      this.errorMessage = '[data-test="error"]';
    }
  
    // Método para navegar até a página
    async navigate() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    // Método para realizar o login
    async login(username, password) {
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