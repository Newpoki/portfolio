import type {Config} from "prettier";

const configuration = {
  plugins: ["prettier-plugin-tailwindcss"],
} as const satisfies Config;

export default configuration;
