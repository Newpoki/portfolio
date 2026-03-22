import z from "zod";
import { emptyEditorRuleSchema } from "@/ui/editor/editor";

const adminExperienceBaseFormSchema = z.object({
  title: z.string().min(1),
  startedAt: z.iso.datetime(),
  endedAt: z.iso.datetime().nullable(),
  content_fr: emptyEditorRuleSchema,
  content_en: emptyEditorRuleSchema,
  place: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
  }),
});

const adminExperienceCreateFormSchema = z.object({
  ...adminExperienceBaseFormSchema.shape,
  type: z.literal("create"),
});

const adminExperienceEditFormSchema = z.object({
  ...adminExperienceBaseFormSchema.shape,
  id: z.string().min(1),
  type: z.literal("edit"),
});

export const adminExperienceFormSchema = z.discriminatedUnion("type", [
  adminExperienceCreateFormSchema,
  adminExperienceEditFormSchema,
]);

export type AdminExperienceForm = z.infer<typeof adminExperienceFormSchema>;
