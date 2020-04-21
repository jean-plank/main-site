module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  reportUnusedDisableDirectives: true,
  rules: {
    '@typescript-eslint/array-type': ['warn', { default: 'array', readonly: 'array' }],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'arrow-body-style': ['warn', 'as-needed'],
    'array-callback-return': 'off',
    'comma-dangle': [
      'warn',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'max-len': ['warn', { code: 100, tabWidth: 2, ignoreStrings: true }],
    'no-console': 'off',
    'no-empty-function': 'off',
    'no-inner-declarations': 'off',
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-multi-spaces': 'warn',
    'no-redeclare': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'prettier/prettier': 'off',
    quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'sort-imports': 'off',
    'space-in-parens': ['warn', 'never'],
    strict: 'warn'
  }
}
