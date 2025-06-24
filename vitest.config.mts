import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'node',
    exclude: ['node_modules/**', '**/e2e/**'],
    setupFiles: './vitest-setup.ts',
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
        'src/lib/constants.ts',
        'src/lib/env.ts',
        'src/lib/logger.ts',
        'src/lib/prisma.ts',
        'src/theme/**',
        'src/middleware.ts',
        // 型
        '**/types/**',
        '**/types.ts',
        // テスト系
        '**/*.test.*',
        '**/*.mock.*',
      ],
    },
  },
});
