import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const pages = [
  "index",
  "ubytovani",
  "aktivity",
  "cenik",
  "kontakt",
  "rezervace",
  "pokyny",
  "provozni-rad",
];
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [
          page,
          resolve(import.meta.dirname, `${page}.html`),
        ]),
      ),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.js"],
    css: false,
  },
});
