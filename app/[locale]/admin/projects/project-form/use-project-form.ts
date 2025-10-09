"use client";

import { useCallback, useMemo } from "react";
import { AdminProjectFormValues } from "./project-form-schemas";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useProjectForm = () => {
  const t = useTranslations("ADMIN");

  const handleCreateExperience = useCallback(
    async (
      formValues: AdminProjectFormValues,
      resolve: () => void,
      reject: () => void,
    ) => {
      try {
        const response = await fetch(`/api/projects`, {
          method: "POST",
          body: JSON.stringify({ formValues }),
        });

        if (!response.ok) {
          throw new Error();
        }

        toast(t("projects.create.notification.success"));

        resolve();
      } catch {
        toast.error(t("projects.create.notification.error"));

        reject();
      }
    },
    [t],
  );

  const handleEditExperience = useCallback(
    async (
      formValues: AdminProjectFormValues,
      resolve: () => void,
      reject: () => void,
    ) => {
      try {
        const response = await fetch("/api/projects", {
          method: "PUT",
          body: JSON.stringify({ formValues }),
        });

        if (!response.ok) {
          throw new Error();
        }

        toast(t("projects.edit.notification.success"));

        resolve();
      } catch {
        toast.error(t("projects.edit.notification.error"));

        reject();
      }
    },
    [t],
  );

  const handleSubmit = useCallback(
    async (formValues: AdminProjectFormValues) => {
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
