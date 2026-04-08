const pluginPlaywright = require('eslint-plugin-playwright');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    {
        ...pluginPlaywright.configs['flat/recommended'],
        files: ['tests/**/*.js'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            globals: {
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'error',
            'no-console': 'warn',
        },
    },
    prettierConfig,
];
