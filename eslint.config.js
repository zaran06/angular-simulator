// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
      '@stylistic': /** @type {import('eslint').ESLint.Plugin} */ (stylistic),
    },
    processor: angular.processInlineTemplates,
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'PropertyDefinition[accessibility="public"]',
          message: 'Do not use explicit public modifier.',
        },
        {
          selector: 'MethodDefinition[accessibility="public"]',
          message: 'Do not use explicit public modifier.',
        },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      quotes: ['warn', 'single'],
      'object-curly-spacing': ['warn', 'always'],
      'template-curly-spacing': ['warn', 'always'],
      semi: ['warn', 'always'],

      '@stylistic/padded-blocks': [
        'error',
        {
          classes: 'always',
        },
      ],

      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'warn',
      '@angular-eslint/template/no-nested-tags': 'error',
    },
  },
]);
