const LoginPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/LoginPage');
const InventoryPage = require('/Users/andersonmann/Documents/codes/poc-playwright/pages/InventoryPage');

class SalePage {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.InventoryPage = new InventoryPage(page);

    }

    
    
    async sale(itemName){
        await this.loginPage.login('standard_user', 'secret_sauce')
        await this.InventoryPage.clickOnItemByName(itemName)
    }

    
}


module.exports = SalePage;