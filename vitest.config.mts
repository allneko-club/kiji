/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'node',
    exclude: ['node_modules/**', '**/e2e/**'],
    setupFiles: './tests/vitest-setup.ts',
    env: loadEnv('', process.cwd(), ''),
    projects: [
      {
        // will inherit options from this config like plugins and pool
        extends: true,
        test: {
          include: ['**/*.test.tsx'],
          name: 'tsx-test',
          environment: 'jsdom',
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/middleware.ts',
        '**/theme/**',
        '**/types/**',
        '**/types.ts',
        'lib/constants.ts',
        'lib/env.ts',
        'lib/logger.ts',
        'lib/prisma.ts',
      ],
    },
  },
});
