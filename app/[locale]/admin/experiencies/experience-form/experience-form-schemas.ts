import { emptyEditorRuleSchema } from "@/components/ui/editor/editor";
import { z } from "zod";

export const experienceFormValuesSchemas = z.object({
  id: z.string().nullable(),
  title: z.string().min(1),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().nullable(),
  content_fr: emptyEditorRuleSchema,
  content_en: emptyEditorRuleSchema,
  place: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
  }),
});

export type ExperienceFormValues = z.infer<typeof experienceFormValuesSchemas>;
