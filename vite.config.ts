import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const base = process.env.GITHUB_PAGES ? "/auto-kuca-zajecar/" : "/";
const basepath = process.env.GITHUB_PAGES ? "/auto-kuca-zajecar" : undefined;

export default defineConfig({
  base,
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: {
        ...(basepath ? { basepath } : {}),
      },
      prerender: {
        enabled: false,
      },
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          outputPath: "/index",
          crawlLinks: false,
        },
      },
    }),
    viteReact(),
  ],
});
