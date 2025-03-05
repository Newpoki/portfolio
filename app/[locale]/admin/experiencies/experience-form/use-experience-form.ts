"use client";

import { useCallback, useMemo, useState } from "react";
import { ExperienceFormValues } from "./experience-form-schemas";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/app/[locale]/i18n/navigation";

export const useExperienceForm = () => {
  const t = useTranslations("ADMIN");
  const { push } = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setIsDeleting(true);

        await fetch(`/api/experiencies/${id}`, {
          method: "DELETE",
        });

        // There is no use to call setIsDeleting when it's done, because :
        // - either we call it before redirection, we'll have a short blink where button is not loading before redirection
        // - either we call it after redirection, we won't be in the component anymore, so user won't see the change
        push("/admin/experiencies");

        toast(t("experiencies.delete.notification.success"));
      } catch {
        setIsDeleting(false);

        toast(t("experiencies.delete.notification.error"));
      }
    },
    [push, t],
  );

  return useMemo(
    () => ({
      onSubmit: handleSubmit,
      onDelete: handleDelete,
      isDeleting,
    }),
    [handleDelete, handleSubmit, isDeleting],
  );
};
