import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { Experience } from "@prisma/client";
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
  deleteExperienceMutationOptions,
  experienceQueryOptions,
} from "@/routes/api/experiencies.$id";
import { m } from "@/i18n/paraglide/messages";
import { experienciesQueryOptions } from "@/routes/api/experiencies";

type ExperienceFormDeleteDialogProps = {
  experience: Experience;
};

export const AdminExperienceFormDeleteDialog = ({
  experience,
}: ExperienceFormDeleteDialogProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteExperience, isPending } = useMutation(
    deleteExperienceMutationOptions,
  );

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    deleteExperience(
      { id: experience.id },
      {
        onSuccess: () => {
          queryClient.removeQueries({
            exact: true,
            queryKey: experienceQueryOptions({ id: experience.id }).queryKey,
          });

          // Then removing the element from the list
          queryClient.setQueryData(
            experienciesQueryOptions.queryKey,
            (current) => {
              return (
                current?.filter((currentExperience) => {
                  return currentExperience.id !== experience.id;
                }) ?? []
              );
            },
          );

          navigate({ to: "/admin/experiencies" });

          toast(m.admin_experiencies_delete_dialog_success());
        },
        onError: () => {
          toast(m.admin_experiencies_delete_dialog_error());
        },
      },
    );
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" type="button" onClick={handleOpenDialog}>
          {m.admin_experiencies_delete_dialog_trigger()}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {m.admin_experiencies_delete_dialog_title()}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {m.admin_experiencies_delete_dialog_description()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={handleCloseDialog}>
            {m.admin_experiencies_delete_dialog_cancel()}
          </AlertDialogCancel>

          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            {isPending && <Loader2Icon className="animate-spin" />}

            {m.admin_experiencies_delete_dialog_delete()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
