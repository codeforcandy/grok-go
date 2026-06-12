/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/grok-go/',
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node'
  }
});