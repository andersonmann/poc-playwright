# Sugestões de Melhorias

## Playwright — Boas práticas do fornecedor

### 1. `headless: false` no config

O config atual abre o browser em todos os ambientes. Em CI/CD isso é problemático. Recomenda-se usar uma variável de ambiente:

```js
headless: process.env.CI ? true : false,
```

### 2. Falta configuração de `projects` (multi-browser)

O README menciona execução em 3 browsers, mas o config não define nenhum `project`. Sem isso, só roda no Chromium padrão:

```js
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];
```

### 3. `baseURL` não está sendo aproveitado

`loginPage.js` e `isLoggedIn()` utilizam a URL completa hardcoded, mesmo havendo `baseURL` definido no config. Usar caminhos relativos:

```js
await this.page.goto('/'); // em vez de 'https://www.saucedemo.com/'
```

### 4. Falta `retries` e `timeout` no config

Playwright recomenda configurar retries (especialmente em CI) e timeouts globais:

```js
retries: process.env.CI ? 2 : 0,
timeout: 30000,
```

### 5. Autenticação sem reutilização de estado (`storageState`)

Playwright recomenda fazer login uma vez e reutilizar o estado de autenticação via `globalSetup` + `storageState`, evitando repetir o login em cada teste. Referência: [Authentication](https://playwright.dev/docs/auth).

---

## Qualidade de código / projeto

### 6. Credenciais hardcoded em múltiplos lugares

`'standard_user'` / `'secret_sauce'` aparecem em `loginPage.js` e `salesPage.js`. Centralizar em um arquivo de constantes ou `.env`:

```
# .env
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

### 7. `SalesPage` instancia outros Page Objects — acoplamento alto

A orquestração entre páginas deveria ficar nas specs ou em fixtures, não dentro de um Page Object. Isso viola o princípio de responsabilidade única (SRP).

### 8. `CartPage.removeItem()` com seletor fixo

O método possui um `TODO` e seletor `[data-test="remove-sauce-labs-bike-light"]` hardcoded. Deve receber o nome do item como parâmetro para gerar o seletor dinamicamente:

```js
async removeItem(itemSlug) {
    await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
}
```

### 9. Parâmetros não utilizados em `checkoutPage.js`

`clickButtonContinue(postalCode)` e `clickButtonFinish(postalCode)` declaram parâmetros que nunca são utilizados. Removê-los para evitar confusão.

### 10. Dados pessoais hardcoded nas specs

`'Anderson'`, `'Mann'`, `'91280350'` estão fixos em `sales.spec.js`. Usar um arquivo de fixtures ou variáveis de ambiente para facilitar manutenção e evitar exposição de dados.

### 11. Inconsistência no casing dos imports

`salesPage.js` importa `'../pages/LoginPage'` e `'../pages/InventoryPage'` com inicial maiúscula, mas os arquivos no disco são `loginPage.js` e `inventoryPage.js`. Em sistemas Linux (case-sensitive) isso causa erro de módulo não encontrado. Padronizar o casing de todos os arquivos e imports.

### 12. Caractere inválido `ß` em `loginPage.js`

Há um caractere `ß` solto na linha 9 que pode causar erro de sintaxe em algumas versões do Node. Remover o caractere.

### 13. Falta linting e formatação

Não há ESLint ou Prettier configurados no projeto. Adicioná-los previne erros como os dos itens 9 e 12 e garante consistência de estilo:

```sh
npm install --save-dev eslint prettier
```

### 14. Sem pipeline de CI

Não há arquivo de workflow (GitHub Actions, Azure DevOps, etc.) para executar os testes automaticamente em pull requests e merges. Criar um pipeline garante feedback contínuo sobre a qualidade do código.

---

## Melhorias identificadas na segunda análise

### 15. `global-setup.js` usa URL hardcoded

`await page.goto('https://www.saucedemo.com/')` está hardcoded no `global-setup.js`. O `baseURL` do `playwright.config.js` não se aplica ao `globalSetup`, então a URL deve vir de `process.env.BASE_URL` ou de uma constante centralizada:

```js
// .env
BASE_URL=https://www.saucedemo.com

// global-setup.js
await page.goto(process.env.BASE_URL);
```

### 16. `pages/salesPage.js` está obsoleto

O arquivo `salesPage.js` não é mais utilizado após a refatoração para fixtures (item 7). Pode ser removido para evitar confusão e manter o projeto limpo.

### 17. Lint e format não executam no pipeline de CI

O workflow `.github/workflows/playwright.yml` não executa `npm run lint` nem `npm run format:check` antes dos testes. Um PR com código malformatado ou com erros de lint passaria no CI sem ser bloqueado.

```yaml
- name: Lint
  run: npm run lint

- name: Check formatting
  run: npm run format:check
```

### 18. `login.spec.js` instancia `LoginPage` diretamente em vez de usar fixture

`sales.spec.js` usa Page Objects via fixtures (`inventoryPage`, `cartPage`, `checkoutPage`), mas `login.spec.js` ainda instancia `LoginPage` manualmente com `new LoginPage(page)`. Adicionar `loginPage` às fixtures garantiria consistência entre as specs.

### 19. Versão do Node não está fixada via `.nvmrc`

O workflow usa `node-version: 18` hardcoded. Criar um arquivo `.nvmrc` com a versão exata garante paridade entre o ambiente local e o CI:

```
# .nvmrc
18
```

```yaml
- uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
```
