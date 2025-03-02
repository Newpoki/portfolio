import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import eslintConfigPrettierRecommended from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const patchedConfig = compat.config({
  extends: ["next/core-web-vitals"],
});

// Migrated config using https://blog.linotte.dev/eslint-9-next-js-935c2b6d0371
const config = tseslint.config(
  patchedConfig,
  tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              importNames: [
                "default",
                "Link",
                "redirect",
                "usePathname",
                "useRouter",
                "getPathname",
              ],
              message: "Please imports from @/i18/navigation instead",
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettierRecommended,
  { ignores: [".next/*"] },
);

export default config;
