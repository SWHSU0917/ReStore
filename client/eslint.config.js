import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

// module.exports = {
//   root: true,
//   env: {browser: true, es2020: true},
//   extends: [
//     'eslint:recommended',
//     'plugin:@javascript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', 'eslint.config.js'],
//   parser: '@javascript-eslint/parser',
//   plugins: ['react-refresh'],
//   rules: {
//     '@javascript-eslint/no-explicit-any': ['off'],
//     'react-refresh/only-export-components': [
//       'warn',
//       {allowContantExport: true},
//     ]
//   }
// }