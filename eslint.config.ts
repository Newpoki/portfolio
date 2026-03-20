import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";
import { tanstackConfig } from "@tanstack/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig(
  ...tanstackConfig,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,

  {
    // Everything here is auto generated, we don't want to bother linting it
    ignores: ["src/paraglide"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "react/jsx-no-literals": "error", // Makes sure using translation instead of raw text
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowTernary: true },
      ],
    },
  },
);
