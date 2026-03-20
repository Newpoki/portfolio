import type {
  Bundler,
  Framework,
  StateManagement,
  UserInterfaceLibrary,
} from "@prisma/client";

// Must recreated constants as only usable on server side
// There is no issues with importing types tho

export const FRAMEWORK = {
  NEXT: "NEXT",
  REACT: "REACT",
  TANSTACK_START: "TANSTACK_START",
} as const satisfies { [K in Framework]: K };

export const BUNDLER = {
  TURBOPACK: "TURBOPACK",
  VITE: "VITE",
  WEBPACK: "WEBPACK",
} as const satisfies { [K in Bundler]: K };

export const USER_INTERFACE_LIBRARY = {
  MATERIAL_UI: "MATERIAL_UI",
  SHADCN: "SHADCN",
  STYLED_COMPONENTS: "STYLED_COMPONENTS",
  TAILWIND_CSS: "TAILWIND_CSS",
} as const satisfies { [K in UserInterfaceLibrary]: K };

export const STATE_MANAGEMENT = {
  NONE: "NONE",
  CONTEXT: "CONTEXT",
  JOTAI: "JOTAI",
  ZUSTAND: "ZUSTAND",
} as const satisfies { [K in StateManagement]: K };

export const FRAMEWORK_OPTIONS = {
  NEXT: { value: FRAMEWORK.NEXT, label: "Next JS" },
  REACT: { value: FRAMEWORK.REACT, label: "React" },
  TANSTACK_START: {
    value: FRAMEWORK.TANSTACK_START,
    label: "Tanstack Start",
  },
} as const;

export const BUNDLER_OPTIONS = {
  TURBOPACK: { value: BUNDLER.TURBOPACK, label: "Turbopack" },
  VITE: { value: BUNDLER.VITE, label: "Vite" },
  WEBPACK: { value: BUNDLER.WEBPACK, label: "Webpack" },
} as const;

export const USER_INTERFACE_OPTIONS = {
  MATERIAL_UI: {
    value: USER_INTERFACE_LIBRARY.MATERIAL_UI,
    label: "Material UI",
  },
  SHADCN: { value: USER_INTERFACE_LIBRARY.SHADCN, label: "Shadcn" },
  STYLED_COMPONENTS: {
    value: USER_INTERFACE_LIBRARY.STYLED_COMPONENTS,
    label: "Styled Components",
  },
  TAILWIND_CSS: {
    value: USER_INTERFACE_LIBRARY.TAILWIND_CSS,
    label: "Tailwind CSS",
  },
} as const;

export const STATE_MANAGEMENT_OPTIONS = {
  NONE: {
    value: STATE_MANAGEMENT.NONE,
    label: "N/A",
  },
  CONTEXT: { value: STATE_MANAGEMENT.CONTEXT, label: "React Context" },
  JOTAI: {
    value: STATE_MANAGEMENT.JOTAI,
    label: "Jotaï",
  },
  ZUSTAND: {
    value: STATE_MANAGEMENT.ZUSTAND,
    label: "Zustand",
  },
} as const;
