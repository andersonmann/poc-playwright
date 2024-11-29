class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Clica em um item pelo nome.
   * 
   * @param {string} itemName - Nome do item a ser clicado.
   */
  async clickOnItemByName(itemName) {
    const itemSelector = `[data-test="inventory-item-name"]:text("${itemName}")`;
    await this.page.waitForSelector(itemSelector);
    await this.page.click(itemSelector);
  }

  /**
   * Adiciona o item no carrinho
   */
  async addItemToCart() {
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  /**
   * Acessa o carrinho a partir da tela de detalhes do item
   */
  async accessCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

}
module.exports = InventoryPage;