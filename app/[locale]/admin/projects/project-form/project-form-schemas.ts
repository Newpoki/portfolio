import {
  Bundler,
  Framework,
  StateManagement,
  UserInterfaceLibrary,
} from "@prisma/client";
import { z } from "zod";

// TODO: It cool be cool to have the error message in translations
export const adminProjectFormValuesSchema = z.object({
  id: z.string().nullable(),
  isFavorite: z.boolean(),
  name: z.string().min(1),
  // This could accept way more, but I want to ensure to keep them all the same format
  illustration: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\.png$/, {
    message: "Filename must be lower case, with png extension",
  }),
  illustrationAlt: z.string().min(1),
  shortDesc_fr: z.string().min(1),
  shortDesc_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  deployedAt: z.string().datetime(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase and hyphen-separated",
  }),
  websiteUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  bundler: z.nativeEnum(Bundler),
  framework: z.nativeEnum(Framework),
  userInterface: z.nativeEnum(UserInterfaceLibrary),
  stateManagement: z.nativeEnum(StateManagement),
});

export type AdminProjectFormValues = z.infer<
  typeof adminProjectFormValuesSchema
>;
