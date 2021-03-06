/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  env: {
    'shared-node-browser': true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/unicorn',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
    // False positives with jscodeshift's collections
    'unicorn/no-fn-reference-in-iterator': 'off',
  },
  overrides: [
    {
      files: 'tests/**/*.test.{j,t}s',
      env: {
        jest: true,
        node: true,
      },
    },
    {
      files: '__testfixtures__/**/*',
      rules: {
        'unicorn/no-abusive-eslint-disable': 'off',
      },
    },
  ],
};

module.exports = config;
