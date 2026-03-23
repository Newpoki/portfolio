import z from "zod";
import {
  BUNDLER,
  FRAMEWORK,
  STATE_MANAGEMENT,
  USER_INTERFACE_LIBRARY,
} from "@/projects/project-constants";
import {
  ADMIN_EXPERIENCE_ALLOWED_EXTENSIONS,
  ADMIN_EXPERIENCE_ALLOWED_EXTENSIONS_READABLE,
  ADMIN_EXPERIENCE_MAX_FILE_SIZE,
} from "./admin-project-form-constants";
import { m } from "@/i18n/paraglide/messages";

export const illustrationFileSchema = z
  .custom<File>((val) => val instanceof File)
  .refine((file) => file.size <= ADMIN_EXPERIENCE_MAX_FILE_SIZE, {
    message: m.admin_projects_form_illustration_exceeded_size({
      size: ADMIN_EXPERIENCE_MAX_FILE_SIZE,
      unit: "MB",
    }),
  })
  .refine(
    (file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      return (
        ext != null &&
        ADMIN_EXPERIENCE_ALLOWED_EXTENSIONS.includes(
          ext as (typeof ADMIN_EXPERIENCE_ALLOWED_EXTENSIONS)[number],
        )
      );
    },
    {
      message: m.admin_projects_form_illustration_invalid_extension({
        extensions: ADMIN_EXPERIENCE_ALLOWED_EXTENSIONS_READABLE,
      }),
    },
  );

const adminProjectBaseFormSchema = z.object({
  isFavorite: z.boolean(),
  name: z.string().min(1),
  illustration: illustrationFileSchema,
  illustrationAlt: z.string().min(1),
  shortDesc_fr: z.string().min(1),
  shortDesc_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  deployedAt: z.iso.datetime(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: m.admin_projects_form_slug_format(),
  }),
  websiteUrl: z.literal("").or(z.url().optional()),
  githubUrl: z.literal("").or(z.url().optional()),
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

/**
 * Validation schema only used to generate a type used for form default values only
 * Only way found to accept a nullish file on initialization, while making it mandatory on submit
 */
export const adminProjectFormDefaultValuesSchema = z.discriminatedUnion(
  "type",
  [
    z.object({
      ...adminProjectCreateFormSchema.shape,
      illustration: illustrationFileSchema.nullable(),
    }),
    z.object({
      ...adminProjectEditFormSchema.shape,
      illustration: illustrationFileSchema.nullable(),
    }),
  ],
);

export type AdminProjectFormDefaultValues = z.infer<
  typeof adminProjectFormDefaultValuesSchema
>;
