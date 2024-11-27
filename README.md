# Descrição

Este código foi desenvolvido como uma POC de automação web utilizando playwright com javascript. Estas instruções fornecerão uma cópia do projeto para execução e alteração em sua máquina local para fins de desenvolvimento e teste. Consulte as instruções abaixo para saber como baixar e executar o projeto.

# Configuração do repositório e ambiente

## Requisitos de sistema
* Node.js 18+
* Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
* macOS 13 Ventura, or later.
* Debian 12, Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

## Instalando Playwright

Comece instalando o Playwright usando npm, yarn ou pnpm. Alternativamente, você também pode começar e executar seus testes usando a [VS Code Extension](https://playwright.dev/docs/getting-started-vscode) .

# Executando os testes

Por padrão, os testes serão executados em todos os 3 navegadores, chromium, firefox e webkit usando 3 workers. Isso pode ser configurado no arquivo [playwright.config](https://playwright.dev/docs/test-configuration) . Os testes são executados no modo headless, o que significa que nenhum navegador será aberto ao executar os testes. Os resultados dos testes e logs de teste serão exibidos no terminal.

```sh
npx playwright test
```

# Gerar relatórios 

Após a conclusão do seu teste, um arquivo HTML será gerado, o que mostra um relatório completo dos seus testes, permitindo que você filtre o relatório por navegadores, testes aprovados, testes reprovados, testes ignorados e testes instáveis. Você pode clicar em cada teste e explorar os erros do teste, bem como cada etapa do teste. Por padrão, o relatório HTML é aberto automaticamente se alguns dos testes falharem.
```sh
npx playwright show-report
```

a