import z from "zod";
import { emptyEditorRuleSchema } from "@/components/ui/editor/editor";

export const adminExperienceFormSchema = z.object({
  id: z.string().nullable(),
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

export type AdminExperienceForm = z.infer<typeof adminExperienceFormSchema>;
