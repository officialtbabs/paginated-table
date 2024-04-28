import { defineConfig } from 'vite';

export default defineConfig({
  // other Vite config options...
  build: {
    rollupOptions: {
      external: ['gsap']
    }
  }
});