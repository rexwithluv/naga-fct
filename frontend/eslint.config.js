import { FlatCompat } from '@eslint/eslintrc'
import tsParser from '@typescript-eslint/parser'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginVue from 'eslint-plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        defineModel: 'readonly',
      },
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/coverage/**', '**/.output/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  skipFormatting,

  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
]
