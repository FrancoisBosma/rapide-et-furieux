const inProductionEnv = process.env.NODE_ENV === 'production'
const rulesSeverityOff = inProductionEnv ? 'warn' : 'off'

module.exports = {
  env: {
    node: true,
  },
  extends: ['@antfu', 'plugin:prettier/recommended'],
  globals: {
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    defineProps: 'readonly',
    withDefaults: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  root: true,
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': rulesSeverityOff,
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'comma-dangle': ['error', 'only-multiline'],
    // Delegates import sorting order to import-sort plugin
    'import/order': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
      },
    ],
    'no-console': rulesSeverityOff,
    'no-debugger': rulesSeverityOff,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    // Delegates curly brace spacing to prettier
    'object-curly-spacing': 'off',
  },
}
