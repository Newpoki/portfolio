import { defineConfig } from "vite-plus";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import svgr from "vite-plugin-svgr";
import { nitro } from "nitro/vite";
import { devtools } from "@tanstack/devtools-vite";
// @ts-expect-error File is not found by if not providing file extension
import { translatedPathnames } from "./src/lib/translated-pathnames.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },

  fmt: {
    printWidth: 80,
    sortTailwindcss: {
      stylesheet: "./src/style.css",
      functions: ["clsx", "cn"],
    },
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    plugins: ["eslint", "typescript", "unicorn", "react"],
    categories: {
      correctness: "error",
    },
    ignorePatterns: ["src/i18n/paraglide", "project.inlang", ".vercel"],
    env: {
      browser: true,
    },
    rules: {
      "no-unused-vars": "off",
      "react/no-children-prop": "off",
      "typescript/no-unused-expressions": ["error", { allowTernary: true }],
      "typescript/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "react/exhaustive-deps": "error",
      "react/jsx-key": "error",
      "react/jsx-curly-brace-presence": "error",
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    tanstackStart({
      sitemap: {
        host: "https://jasonsavelli.fr",
        enabled: true,
      },
      prerender: {
        failOnError: false,
      },
    }),
    nitro({
      preset: "vercel",
    }),
    viteReact(), // react's vite plugin must come after start's vite plugin
    tailwindcss(),
    svgr(),
    paraglideVitePlugin({
      project: "./src/i18n/project.inlang",
      outdir: "./src/i18n/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: translatedPathnames,
    }),
  ],
});
