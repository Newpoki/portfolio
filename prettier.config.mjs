/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const configuration = {
  tailwindFunctions: ["classnames"],
  tailwindConfig: "./tailwind.config.js",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default configuration;
