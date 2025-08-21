const js = require('@eslint/js')

module.exports = [
  {
    ignores: [
      'node_modules/**',
      '**/*.config.js',
      'tests/setup.js',
      'cypress/support/e2e.js'
    ]
  },
  {
    ...js.configs.recommended,
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        FileReader: 'readonly',
        HTMLElement: 'readonly',
        setTimeout: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        // Cypress globals
        cy: 'readonly',
        Cypress: 'readonly',
        // Project classes (available globally through script tags)
        Button: 'readonly',
        Icon: 'readonly',
        Input: 'readonly',
        FormField: 'readonly',
        StatusIndicator: 'readonly',
        Header: 'readonly',
        Modal: 'readonly',
        ShoppingList: 'readonly',
        Storage: 'readonly',
        I18n: 'readonly',
        ShoppingListApp: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { 
        'varsIgnorePattern': '^(Button|Icon|Input|FormField|StatusIndicator|Header|Modal|ShoppingList|Storage|I18n|ShoppingListApp)$' 
      }],
      'no-undef': 'error',
      'no-console': 'off',
      'no-debugger': 'error',
      'prefer-const': 'warn',
      'no-var': 'warn',
      'semi': ['error', 'never'],
      'quotes': ['warn', 'single'],
      'indent': ['warn', 2],
      'no-trailing-spaces': 'warn',
      'eol-last': 'warn',
      'no-redeclare': 'off'
    }
  }
]