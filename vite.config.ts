import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "object-validator",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [dts()],
});
