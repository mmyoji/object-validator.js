import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "object-validator",
      fileName: (format) => `object-validator.${format}.js`,
    },
  },
});
