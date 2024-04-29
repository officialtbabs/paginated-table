import { defineConfig } from "vite";

export default defineConfig({
  // other Vite config options...
  build: {
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    rollupOptions: {
      external: ["gsap"],
    },
  },
});
