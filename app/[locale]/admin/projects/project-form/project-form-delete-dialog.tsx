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
import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useDeleteProject } from "./use-delete-project";
import { Loader2Icon } from "lucide-react";

type ProjectFormDeleteDialogProps = {
  project: Project;
};

export const ProjectFormDeleteDialog = ({
  project,
}: ProjectFormDeleteDialogProps) => {
  const t = useTranslations("ADMIN.projects");

  const { isDeleting, onDelete, isDialogOpen, openDialog, closeDialog } =
    useDeleteProject();

  const handleDelete = useCallback(() => {
    onDelete(project.id);
  }, [project, onDelete]);

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
          <AlertDialogCancel disabled={isDeleting} onClick={closeDialog}>
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
