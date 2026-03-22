import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import {
  adminExperienceFormOptions,
  useAppForm,
} from "./admin-experience-form-utils";
import { AdminExperienceFormDeleteDialog } from "./admin-experience-form-delete-dialog";
import type { Experience } from "@prisma/client";
import { m } from "@/i18n/paraglide/messages";
import {
  experienceQueryOptions,
  updateExperienceMutationOptions,
} from "@/routes/api/experiencies.$id";
import {
  createExperienceMutationOptions,
  experienciesQueryOptions,
} from "@/routes/api/experiencies";

type AdminExperienceFormProps = {
  experience?: Experience;
};

export const AdminExperienceForm = ({
  experience,
}: AdminExperienceFormProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: createExperience } = useMutation(
    createExperienceMutationOptions,
  );
  const { mutateAsync: updateExperience } = useMutation(
    updateExperienceMutationOptions,
  );

  const form = useAppForm({
    ...adminExperienceFormOptions(experience),
    onSubmit: async ({ value }) => {
      if (value.type === "edit") {
        try {
          const response = await updateExperience(value);

          // Updating the existing experience
          queryClient.setQueryData(
            experienceQueryOptions({ id: response.id }).queryKey,
            response,
          );

          // Then updating the list
          queryClient.setQueryData(
            experienciesQueryOptions.queryKey,
            (current) => {
              return (
                current?.map((currentExperience) => {
                  return currentExperience.id === response.id
                    ? response
                    : currentExperience;
                }) ?? []
              );
            },
          );

          toast(m.admin_experiencies_edit_success());
        } catch {
          toast(m.admin_experiencies_edit_error());
        }

        return;
      }

      try {
        const response = await createExperience(value);

        // Creating the new experience
        queryClient.setQueryData(
          experienceQueryOptions({ id: response.id }).queryKey,
          response,
        );

        // And then, as we can't know where will it be added in the list, invalidating the list
        queryClient.invalidateQueries({
          exact: true,
          queryKey: experienciesQueryOptions.queryKey,
        });

        navigate({
          to: "/admin/experiencies/$id",
          params: { id: response.id },
        });

        toast(m.admin_experiencies_create_success());
      } catch {
        toast(m.admin_experiencies_create_error());
      }
    },
  });

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    form.handleSubmit();
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <form.AppField
          name="title"
          children={(field) => (
            <field.TextField
              label={m.admin_experiencies_form_title_label()}
              description={m.admin_experiencies_form_title_description()}
              placeholder={m.admin_experiencies_form_title_placeholder()}
            />
          )}
        />

        <section className="grid grid-cols-1 items-baseline gap-8 sm:grid-cols-2">
          <form.AppField
            name="place.city"
            children={(field) => (
              <field.TextField
                label={m.admin_experiencies_form_place_city_label()}
                description={m.admin_experiencies_form_place_city_description()}
                placeholder={m.admin_experiencies_form_place_city_placeholder()}
              />
            )}
          />

          <form.AppField
            name="place.country"
            children={(field) => (
              <field.TextField
                label={m.admin_experiencies_form_place_country_label()}
                description={m.admin_experiencies_form_place_country_description()}
                placeholder={m.admin_experiencies_form_place_country_placeholder()}
              />
            )}
          />
        </section>

        <form.AppField
          name="startedAt"
          children={(field) => (
            <field.DateField
              label={m.admin_experiencies_form_started_at_label()}
              description={m.admin_experiencies_form_started_at_description()}
              placeholder={m.admin_experiencies_form_started_at_placeholder()}
            />
          )}
        />

        <form.AppField
          name="endedAt"
          children={(field) => (
            <field.DateField
              label={m.admin_experiencies_form_ended_at_label()}
              description={m.admin_experiencies_form_ended_at_description()}
              placeholder={m.admin_experiencies_form_ended_at_placeholder()}
            />
          )}
        />

        <form.AppField
          name="content_en"
          children={(field) => (
            <field.EditorField
              label={m.admin_experiencies_form_content_label()}
              locale="en"
            />
          )}
        />

        <form.AppField
          name="content_fr"
          children={(field) => (
            <field.EditorField
              label={m.admin_experiencies_form_content_label()}
              locale="fr"
            />
          )}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form.AppForm>
            <form.CancelButton label={m.admin_experiencies_form_cancel()} />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <form.AppForm>
                <form.SubmitButton
                  label={
                    experience != null
                      ? m.admin_projects_form_submit_edit()
                      : m.admin_projects_form_submit_create()
                  }
                />
              </form.AppForm>

              {experience != null && (
                <AdminExperienceFormDeleteDialog experience={experience} />
              )}
            </div>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
};
