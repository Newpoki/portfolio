import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { AdminExperienceFormTextField } from "./fields/admin-experience-form-text-field";
import { adminExperienceFormSchema } from "./admin-experience-form-types";
import { AdminExperienceFormDateField } from "./fields/admin-experience-form-date-field";
import { AdminExperienceFormEditorField } from "./fields/admin-experience-form-editor-field";
import { AdminExperienceFormCancelButton } from "./fields/admin-experience-form-cancel-button";
import { AdminExperienceFormSubmitButton } from "./fields/admin-experience-form-submit-button";
import type { AdminExperienceForm } from "./admin-experience-form-types";
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
  const place =
    experience?.place != null
      ? {
          // @ts-expect-error Bad Prisma generated type
          city: experience.place.city as string,
          // I've only worked in France for now, this field a bit useless but who knows
          // @ts-expect-error Bad Prisma generated type
          country: experience.place.country as string,
        }
      : { city: "", country: "FR" };

  const defaultValues: AdminExperienceForm =
    experience != null
      ? {
          type: "edit",
          id: experience.id,
          // Prisma returns a string type, but the value is an ISO string
          startedAt: new Date(experience.startedAt).toISOString(),
          // Prisma returns a string type, but the value is an ISO string
          endedAt: new Date(experience.startedAt).toISOString(),
          title: experience.title,
          content_en: experience.content_en,
          content_fr: experience.content_fr,
          place,
        }
      : {
          type: "create",
          startedAt: "",
          endedAt: null,
          title: "",
          content_en: JSON.stringify(VALID_EMPTY_EDITOR_JSON),
          content_fr: JSON.stringify(VALID_EMPTY_EDITOR_JSON),
          place,
        };

  return {
    defaultValues,
    validators: {
      onSubmit: adminExperienceFormSchema,
    },
  };
};
