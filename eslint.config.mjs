import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**/*.ts',
      'dist/**',
      '**/*.mjs',
      'eslint.config.mjs',
      '**/*.js',
    ],
  },
  {
    files: ['src/**/*.ts'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettierConfig,
);
