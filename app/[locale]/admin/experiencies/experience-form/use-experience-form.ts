"use client";

import { useCallback, useMemo } from "react";
import { ExperienceFormValues } from "./experience-form-schemas";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useExperienceForm = () => {
  const t = useTranslations("ADMIN");

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

        toast(t("experiencies.create.notification.success"));

        resolve();
      } catch {
        toast.error(t("experiencies.create.notification.error"));

        reject();
      }
    },
    [t],
  );

  const handleEditExperience = useCallback(
    async (
      formValues: ExperienceFormValues,
      resolve: () => void,
      reject: () => void,
    ) => {
      try {
        const response = await fetch("/api/experiencies", {
          method: "PUT",
          body: JSON.stringify({ formValues }),
        });

        if (!response.ok) {
          throw new Error();
        }

        toast(t("experiencies.edit.notification.success"));

        resolve();
      } catch {
        toast.error(t("experiencies.edit.notification.error"));

        reject();
      }
    },
    [t],
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
