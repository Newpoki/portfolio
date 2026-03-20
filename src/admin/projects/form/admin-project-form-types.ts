import z from "zod";
import {
  BUNDLER,
  FRAMEWORK,
  STATE_MANAGEMENT,
  USER_INTERFACE_LIBRARY,
} from "../../../../project/project-constants";

const adminProjectBaseFormSchema = z.object({
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
  deployedAt: z.iso.datetime(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase and hyphen-separated",
  }),
  websiteUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  bundler: z.enum(BUNDLER),
  framework: z.enum(FRAMEWORK),
  userInterface: z.enum(USER_INTERFACE_LIBRARY),
  stateManagement: z.enum(STATE_MANAGEMENT),
});

export const adminProjectCreateFormSchema = z.object({
  ...adminProjectBaseFormSchema.shape,
  type: z.literal("create"),
});

export const adminProjectEditFormSchema = z.object({
  ...adminProjectBaseFormSchema.shape,
  id: z.string(),
  type: z.literal("edit"),
});

export const adminProjectFormSchema = z.discriminatedUnion("type", [
  adminProjectCreateFormSchema,
  adminProjectEditFormSchema,
]);

export type AdminProjectForm = z.infer<typeof adminProjectFormSchema>;
