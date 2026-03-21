import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { AdminProjectFormTextField } from "./fields/admin-project-form-text-field";
import { adminProjectFormSchema } from "./admin-project-form-types";
import { AdminProjectFormDateField } from "./fields/admin-project-form-date-field";
import { AdminProjectFormCancelButton } from "./fields/admin-project-form-cancel-button";
import { AdminProjectFormSubmitButton } from "./fields/admin-project-form-submit-button";
import { AdminProjectFormSwitch } from "./fields/admin-project-form-switch";
import { AdminProjectFormLinkField } from "./fields/admin-project-form-link-field";
import { AdminProjectFormAutocompleteField } from "./fields/admin-project-form-autocomplete";
import type { AdminProjectForm } from "./admin-project-form-types";
import type { Project } from "@prisma/client";
import {
  BUNDLER,
  FRAMEWORK,
  STATE_MANAGEMENT,
  USER_INTERFACE_LIBRARY,
} from "@/projects/project-constants";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField: AdminProjectFormTextField,
    DateField: AdminProjectFormDateField,
    LinkField: AdminProjectFormLinkField,
    AutocompleteField: AdminProjectFormAutocompleteField,
    Switch: AdminProjectFormSwitch,
  },
  formComponents: {
    CancelButton: AdminProjectFormCancelButton,
    SubmitButton: AdminProjectFormSubmitButton,
  },
  fieldContext,
  formContext,
});

export const adminProjectFormOptions = (project?: Project) => {
  const defaultValues: AdminProjectForm =
    project != null
      ? {
          type: "edit",
          id: project.id,
          name: project.name,
          isFavorite: project.isFavorite,
          // Prisma returns a string type, but the value is an ISO string
          deployedAt: new Date(project.deployedAt).toISOString(),
          shortDesc_fr: project.shortDesc_fr,
          shortDesc_en: project.shortDesc_en,
          description_fr: project.description_fr,
          description_en: project.description_en,
          illustration: project.illustration,
          illustrationAlt: project.illustrationAlt,
          githubUrl: project.githubUrl ?? "",
          websiteUrl: project.websiteUrl ?? "",
          slug: project.slug,
          bundler: project.bundler,
          framework: project.framework,
          userInterface: project.userInterface,
          stateManagement: project.stateManagement,
        }
      : {
          type: "create",
          name: "",
          isFavorite: false,
          deployedAt: "",
          shortDesc_fr: "",
          shortDesc_en: "",
          description_fr: "",
          description_en: "",
          illustration: "",
          illustrationAlt: "",
          githubUrl: "",
          websiteUrl: "",
          slug: "",
          bundler: BUNDLER.VITE,
          framework: FRAMEWORK.TANSTACK_START,
          userInterface: USER_INTERFACE_LIBRARY.SHADCN,
          stateManagement: STATE_MANAGEMENT.NONE,
        };

  return {
    defaultValues,
    validators: {
      onSubmit: adminProjectFormSchema,
    },
  };
};
