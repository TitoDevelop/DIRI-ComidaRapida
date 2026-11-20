/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// En local usamos /; en GitHub Pages la web vive bajo /DIRI-ComidaRapida/.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/DIRI-ComidaRapida/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
}));
