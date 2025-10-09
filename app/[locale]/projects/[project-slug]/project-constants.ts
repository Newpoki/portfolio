import { Bundler, Framework, UserInterfaceLibrary } from "@prisma/client";

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

export const USER_INTERFACE_OPTIONS = {
  MATERIAL_UI: {
    value: UserInterfaceLibrary.MATERIAL_UI,
    label: "Material UI",
  },
  SHADCN: { value: UserInterfaceLibrary.SHADCN, label: "Shadcn" },
  STYLED_COMPONENTS: {
    value: UserInterfaceLibrary.STYLED_COMPONENTS,
    label: "Styled Components",
  },
  TAILWIND_CSS: {
    value: UserInterfaceLibrary.TAILWIND_CSS,
    label: "Tailwind CSS",
  },
} as const;
