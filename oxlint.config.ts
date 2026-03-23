import { defineConfig } from "oxlint";

export default defineConfig({
  $schema: "./node_modules/oxlint/configuration_schema.json",
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
});
