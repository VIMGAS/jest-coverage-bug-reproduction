module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import-helpers', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-new': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'no-useless-constructor': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off', // replaced by ts-eslint rule below
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
      },
    ],
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
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'camelcase': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@config/',
          '/^@shared/',
          '/^@modules/',
          '/^@/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
