import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { AdminExperienceFormTextField } from "./fields/admin-experience-form-text-field";
import { adminExperienceFormSchema } from "./admin-experience-form-types";
import { AdminExperienceFormDateField } from "./fields/admin-experience-form-date-field";
import { AdminExperienceFormEditorField } from "./fields/admin-experience-form-editor-field";
import { AdminExperienceFormCancelButton } from "./fields/admin-experience-form-cancel-button";
import { AdminExperienceFormSubmitButton } from "./fields/admin-experience-form-submit-button";
import type { Experience } from "@prisma/client";
import { VALID_EMPTY_EDITOR_JSON } from "@/components/ui/editor/editor";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField: AdminExperienceFormTextField,
    DateField: AdminExperienceFormDateField,
    EditorField: AdminExperienceFormEditorField,
  },
  formComponents: {
    CancelButton: AdminExperienceFormCancelButton,
    SubmitButton: AdminExperienceFormSubmitButton,
  },
  fieldContext,
  formContext,
});

export const adminExperienceFormOptions = (experience?: Experience) => {
  return {
    defaultValues: {
      id: experience?.id ?? null,
      startedAt: experience?.startedAt
        ? new Date(experience.startedAt).toISOString()
        : "",
      endedAt: experience?.endedAt
        ? new Date(experience.endedAt).toISOString()
        : null,

      title: experience?.title ?? "",
      content_en: experience?.content_en
        ? experience.content_en
        : JSON.stringify(VALID_EMPTY_EDITOR_JSON),
      content_fr: experience?.content_fr
        ? experience.content_fr
        : JSON.stringify(VALID_EMPTY_EDITOR_JSON),
      place:
        experience?.place != null
          ? {
              // @ts-expect-error Bad type
              city: experience.place.city as string,
              // I've only worked in France for now, this field a bit useless but who knows
              // @ts-expect-error Bad type
              country: experience.place.country as string,
            }
          : { city: "", country: "FR" },
    },
    validators: {
      onSubmit: adminExperienceFormSchema,
    },
  };
};
