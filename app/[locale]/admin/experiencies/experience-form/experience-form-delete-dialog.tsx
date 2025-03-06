"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { Experience } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useDeleteExperience } from "./use-delete-experience";
import { Loader2Icon } from "lucide-react";

type ExperienceFormDeleteDialogProps = {
  experience: Experience;
};

export const ExperienceFormDeleteDialog = ({
  experience,
}: ExperienceFormDeleteDialogProps) => {
  const t = useTranslations("ADMIN.experiencies");

  const { isDeleting, onDelete, isDialogOpen, openDialog } =
    useDeleteExperience();

  const handleDelete = useCallback(() => {
    onDelete(experience.id);
  }, [experience, onDelete]);

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" type="button" onClick={openDialog}>
          {t("delete-dialog.trigger")}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-dialog.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete-dialog.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {t("delete-dialog.actions.cancel")}
          </AlertDialogCancel>

          <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
            {isDeleting && <Loader2Icon className="animate-spin" />}
            {t("delete-dialog.actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
