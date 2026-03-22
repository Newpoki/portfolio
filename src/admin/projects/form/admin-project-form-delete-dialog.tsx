import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-form";
import { useFormContext } from "./admin-project-form-utils";
import type { Project } from "@prisma/client";
import { Button } from "@/ui/button";
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
} from "@/ui/alert-dialog";
import {
  deleteProjectMutationOptions,
  projectQueryOptions,
} from "@/routes/api/projects.$slug";
import { m } from "@/i18n/paraglide/messages";
import { projectsQueryOptions } from "@/routes/api/projects";
import { projectsSummaryQueryOptions } from "@/routes/api/projects.summary";

type ProjectFormDeleteDialogProps = {
  project: Project;
};

export const AdminProjectFormDeleteDialog = ({
  project,
}: ProjectFormDeleteDialogProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteProject, isPending } = useMutation(
    deleteProjectMutationOptions,
  );

  const form = useFormContext();

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    deleteProject(
      { id: project.id },
      {
        onSuccess: () => {
          queryClient.removeQueries({
            exact: true,
            queryKey: projectQueryOptions({ slug: project.slug }).queryKey,
          });

          // Then removing the element from the list
          queryClient.setQueryData(projectsQueryOptions.queryKey, (current) => {
            return (
              current?.filter((currentProject) => {
                return currentProject.id !== project.id;
              }) ?? []
            );
          });

          // Then removing the element from the list and also from the summaries list
          queryClient.setQueryData(
            projectsSummaryQueryOptions.queryKey,
            (current) => {
              return (
                current?.filter((currentProject) => {
                  return currentProject.id !== project.id;
                }) ?? []
              );
            },
          );

          navigate({ to: "/admin/projects" });

          toast(m.admin_projects_delete_dialog_notification_success());
        },
        onError: () => {
          toast(m.admin_projects_delete_dialog_notification_error());
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          type="button"
          onClick={handleOpenDialog}
          disabled={isSubmitting}
        >
          {m.admin_projects_delete_dialog_trigger()}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {m.admin_projects_delete_dialog_title()}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {m.admin_projects_delete_dialog_description()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={handleCloseDialog}>
            {m.admin_projects_delete_dialog_actions_cancel()}
          </AlertDialogCancel>

          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            {isPending && <Loader2Icon className="animate-spin" />}

            {m.admin_projects_delete_dialog_actions_delete()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
