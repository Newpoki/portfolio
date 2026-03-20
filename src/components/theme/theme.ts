import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import z from "zod";

/**
 * https://www.youtube.com/watch?v=h8QJ-keNnHw
 */
const STORAGE_KEY = "app-theme";

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
} as const;

export const getThemeServerFn = createServerFn().handler(() => {
  return themeSchema.default("auto").parse(getCookie(STORAGE_KEY));
});

export const themeSchema = z.enum(THEME);

export type Theme = z.infer<typeof themeSchema>;

export const setThemeServerFn = createServerFn()
  .inputValidator(themeSchema)
  .handler(({ data }) => setCookie(STORAGE_KEY, data));
