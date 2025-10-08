import { Bundler, Framework, UserInterfaceLibrary } from "@prisma/client";
import { z } from "zod";

// TODO: It cool be cool to have the error message in translations
export const adminProjectFormValuesSchema = z.object({
  id: z.string().nullable(),
  isFavorite: z.boolean(),
  name: z.string().min(1),
  //   TODO: Improve description so it says it's just he file name + ensure its just the file name
  illustration: z.string().min(1),
  illustrationAlt: z.string().min(1),
  shortDesc_fr: z.string().min(1),
  shortDesc_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  deployedAt: z.string().datetime(),
  // TODO: Ensure it's all lowercase with only a-z-dash
  slug: z.string().min(1),
  websiteUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  bundler: z.nativeEnum(Bundler),
  framework: z.nativeEnum(Framework),
  userInterface: z.nativeEnum(UserInterfaceLibrary),
});

export type AdminProjectFormValues = z.infer<
  typeof adminProjectFormValuesSchema
>;
