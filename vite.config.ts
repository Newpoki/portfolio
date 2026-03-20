import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import svgr from "vite-plugin-svgr";

import { translatedPathnames } from "./src//lib/translated-pathnames"; // tsconfigPaths is setup below, can't use aliases yet

export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    viteReact(), // react's vite plugin must come after start's vite plugin
    tailwindcss(),
    svgr(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: translatedPathnames,
    }),
  ],
});
