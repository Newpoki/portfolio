import { Bundler, Framework } from "@prisma/client";

export const FRAMEWORK_OPTIONS = {
  NEXT: { value: Framework.NEXT, label: "Next JS" },
  REACT: { value: Framework.REACT, label: "React" },
  TANSTACK_START: { value: Framework.TANSTACK_START, label: "Tanstack Start" },
} as const;

export const BUNDLER_OPTIONS = {
  TURBOPACK: { value: Bundler.TURBOPACK, label: "Turbopack" },
  VITE: { value: Bundler.VITE, label: "Vite" },
  WEBPACK: { value: Bundler.WEBPACK, label: "Webpack" },
} as const;
