"use client";

import { useRouter } from "@/app/[locale]/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export const useDeleteExperience = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { push } = useRouter();

  const t = useTranslations("ADMIN.experiencies.delete-dialog");

  const handleOpenDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

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

        toast(t("notification.success"));
      } catch {
        setIsDeleting(false);

        toast(t("notification.error"));
      }
    },
    [push, t],
  );

  return useMemo(
    () => ({
      isDialogOpen,
      isDeleting,
      onDelete: handleDelete,
      openDialog: handleOpenDialog,
      closeDialog: handleCloseDialog,
    }),
    [handleDelete, handleOpenDialog, isDeleting, isDialogOpen],
  );
};
