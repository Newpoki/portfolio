import { defineConfig } from "oxfmt";

export default defineConfig({
  $schema: "./node_modules/oxfmt/configuration_schema.json",
  printWidth: 80,
  sortTailwindcss: {
    stylesheet: "./src/style.css",
    functions: ["clsx", "cn"],
  },
});
