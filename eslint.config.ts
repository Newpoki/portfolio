import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";
import { tanstackConfig } from "@tanstack/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig(
  ...tanstackConfig,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    // Everything here is auto generated, we don't want to bother linting it
    ignores: ["src/i18n/paraglide", "project.inlang", ".vercel"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...react.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    ...react.configs.flat["jsx-runtime"], // Add this if you are using React 17+
    plugins: {
      react,
      "@stylistic": stylistic,
    },
    languageOptions: {
      ...react.configs.flat.recommended?.languageOptions,
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
      "react/jsx-no-literals": "error", // Makes sure using translation instead of raw text
      "@typescript-eslint/no-unused-expressions": [
        // Allow uses of a ? b() : c()
        "error",
        { allowTernary: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "react-hooks/exhaustive-deps": "error", // We never want to omit hooks dependencies
      "react/jsx-key": "error", // We never want to omit key on JSX items that requires it
      "@stylistic/quotes": ["error", "double"], // Force double quote, only allow backtick when using var inside
      "react/jsx-curly-brace-presence": ["error"],
    },
  },
);
