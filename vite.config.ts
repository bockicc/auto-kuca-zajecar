import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/auto-kuca-zajecar/",
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
        basepath: "/auto-kuca-zajecar",
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
