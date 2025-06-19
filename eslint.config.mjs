import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  ...compat.config({
    extends: ['next', 'next/typescript', 'prettier'],
    rules: {
      '@typescript-eslint/no-explicit-any': 1,
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '^@mui/[^/]+$' }],
        },
      ],
    },
  }),
];

export default eslintConfig;
