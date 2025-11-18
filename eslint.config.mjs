import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const filename = fileURLToPath(import.meta.url)
const dirName = dirname(filename)

const compat = new FlatCompat({
  baseDirectory: dirName,
})

const eslintConfig = [
  ...compat.extends(
    'next',
    // 'airbnb',
    'prettier',
    'next/typescript',
    'next/core-web-vitals',
    'plugin:prettier/recommended'
  ),
  ...compat.plugins('prettier'),
  {
    rules: {
      'import/extensions': 'off',
      'no-nested-ternary': 'warn',
      'react/require-default-props': 'off', // let it handle by TypeScript
      'import/prefer-default-export': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/no-extraneous-dependencies': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/function-component-definition': 'off',
    },
  },
]

export default eslintConfig
