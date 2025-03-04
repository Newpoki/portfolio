"use client";

import { useCallback, useMemo } from "react";
import { ExperienceFormValues } from "./experience-form-schemas";
import { toast } from "sonner";

export const useSubmitExperienceForm = () => {
  const handleCreateExperience = useCallback(
    async (
      formValues: ExperienceFormValues,
      resolve: () => void,
      reject: () => void,
    ) => {
      try {
        const response = await fetch(`/api/experiencies`, {
          method: "POST",
          body: JSON.stringify({ formValues }),
        });

        if (!response.ok) {
          throw new Error();
        }

        toast("Experience has been created.");

        resolve();
      } catch {
        toast.error("An error occured while creating experience.");

        reject();
      }
    },
    [],
  );

  const handleEditExperience = useCallback(
    async (
      formValues: ExperienceFormValues,
      resolve: () => void,
      reject: () => void,
    ) => {
      try {
        const response = await fetch(`/api/experiencies`, {
          method: "PUT",
          body: JSON.stringify({ formValues }),
        });

        if (!response.ok) {
          throw new Error();
        }

        toast("Experience has been edited.");

        resolve();
      } catch {
        toast("An error occured while editing experience");

        reject();
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (formValues: ExperienceFormValues) => {
      return new Promise<void>((resolve, reject) => {
        const isEditing = formValues.id != null;

        return isEditing
          ? handleEditExperience(formValues, resolve, reject)
          : handleCreateExperience(formValues, resolve, reject);
      });
    },
    [handleCreateExperience, handleEditExperience],
  );

  return useMemo(
    () => ({
      onSubmit: handleSubmit,
    }),
    [handleSubmit],
  );
};
