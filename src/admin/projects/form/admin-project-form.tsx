import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

import {
  adminProjectFormOptions,
  useAppForm,
} from "./admin-project-form-utils";
import { AdminProjectFormDeleteDialog } from "./admin-project-form-delete-dialog";
import type { Project } from "@prisma/client";
import {
  BUNDLER_OPTIONS,
  FRAMEWORK_OPTIONS,
  STATE_MANAGEMENT_OPTIONS,
  USER_INTERFACE_OPTIONS,
} from "@/projects/project-constants";
import { m } from "@/i18n/paraglide/messages";
import {
  projectQueryOptions,
  updateProjectMutationOptions,
} from "@/routes/api/projects.$slug";
import {
  createProjectMutationOptions,
  projectsQueryOptions,
} from "@/routes/api/projects";
import { projectsSummaryQueryOptions } from "@/routes/api/projects.summary";

type AdminProjectFormProps = {
  project?: Project;
};

const bundlerOptions = [
  BUNDLER_OPTIONS.TURBOPACK,
  BUNDLER_OPTIONS.VITE,
  BUNDLER_OPTIONS.WEBPACK,
];

const frameworkOptions = [
  FRAMEWORK_OPTIONS.NEXT,
  FRAMEWORK_OPTIONS.REACT,
  FRAMEWORK_OPTIONS.TANSTACK_START,
];

const userInterfaceOptions = [
  USER_INTERFACE_OPTIONS.MATERIAL_UI,
  USER_INTERFACE_OPTIONS.SHADCN,
  USER_INTERFACE_OPTIONS.STYLED_COMPONENTS,
  USER_INTERFACE_OPTIONS.TAILWIND_CSS,
];

const stateManagementOptions = [
  STATE_MANAGEMENT_OPTIONS.CONTEXT,
  STATE_MANAGEMENT_OPTIONS.JOTAI,
  STATE_MANAGEMENT_OPTIONS.NONE,
  STATE_MANAGEMENT_OPTIONS.ZUSTAND,
];

export const AdminProjectForm = ({ project }: AdminProjectFormProps) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: createProject } = useMutation(
    createProjectMutationOptions,
  );
  const { mutateAsync: updateProject } = useMutation(
    updateProjectMutationOptions,
  );

  const form = useAppForm({
    ...adminProjectFormOptions(project),
    onSubmit: async ({ value }) => {
      if (value.type === "edit") {
        try {
          const response = await updateProject(value);

          // Updating the existing project
          queryClient.setQueryData(
            projectQueryOptions({ slug: response.slug }).queryKey,
            response,
          );

          // Then updating the list
          queryClient.setQueryData(projectsQueryOptions.queryKey, (current) => {
            return (
              current?.map((currentProject) => {
                return currentProject.id === response.id
                  ? response
                  : currentProject;
              }) ?? []
            );
          });

          // Then updating the list
          queryClient.setQueryData(
            projectsSummaryQueryOptions.queryKey,
            (current) => {
              return (
                current?.map((currentProject) => {
                  return currentProject.id === response.id
                    ? response
                    : currentProject;
                }) ?? []
              );
            },
          );

          // Even on edition we're redirecting because the slug might also has been updated
          navigate({
            to: "/admin/projects/$slug",
            params: { slug: response.slug },
          });

          toast(m.admin_projects_edit_notification_success());
        } catch {
          toast(m.admin_projects_edit_notification_error());
        }

        return;
      }

      try {
        const response = await createProject(value);

        // Creating the new project
        queryClient.setQueryData(
          projectQueryOptions({ slug: response.slug }).queryKey,
          response,
        );

        // And then, as we can't know where will it be added in the list, invalidating the list
        queryClient.invalidateQueries({
          exact: true,
          queryKey: projectsQueryOptions.queryKey,
        });

        queryClient.invalidateQueries({
          exact: true,
          queryKey: projectsSummaryQueryOptions.queryKey,
        });

        navigate({
          to: "/admin/projects/$slug",
          params: { slug: response.slug },
        });

        toast(m.admin_projects_create_notification_success());
      } catch {
        toast(m.admin_projects_create_notification_error());
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
          name="isFavorite"
          children={(field) => (
            <field.Switch
              label={m.admin_projects_form_is_favorite_label()}
              description={m.admin_projects_form_is_favorite_description()}
            />
          )}
        />

        <section className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
          <form.AppField
            name="name"
            children={(field) => (
              <field.TextField
                label={m.admin_projects_form_name_label()}
                description={m.admin_projects_form_name_description()}
                placeholder={m.admin_projects_form_name_placeholder()}
              />
            )}
          />

          <form.AppField
            name="deployedAt"
            children={(field) => (
              <field.DateField
                label={m.admin_projects_form_deployed_at_label()}
                description={m.admin_projects_form_deployed_at_description()}
                placeholder={m.admin_projects_form_deployed_at_placeholder()}
              />
            )}
          />
        </section>

        <section className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
          <form.AppField
            name="illustration"
            children={(field) => (
              <field.TextField
                label={m.admin_projects_form_illustration_label()}
                description={m.admin_projects_form_illustration_description()}
                placeholder={m.admin_projects_form_illustration_placeholder()}
              />
            )}
          />

          <form.AppField
            name="illustrationAlt"
            children={(field) => (
              <field.TextField
                label={m.admin_projects_form_illustration_alt_label()}
                description={m.admin_projects_form_illustration_alt_description()}
                placeholder={m.admin_projects_form_illustration_alt_placeholder()}
              />
            )}
          />
        </section>

        <section className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
          <form.AppField
            name="githubUrl"
            children={(field) => (
              <field.LinkField
                label={m.admin_projects_form_github_url_label()}
                description={m.admin_projects_form_github_url_description()}
                placeholder={m.admin_projects_form_github_url_placeholder()}
              />
            )}
          />

          <form.AppField
            name="websiteUrl"
            children={(field) => (
              <field.LinkField
                label={m.admin_projects_form_website_url_label()}
                description={m.admin_projects_form_website_url_description()}
                placeholder={m.admin_projects_form_website_url_placeholder()}
              />
            )}
          />
        </section>

        <form.AppField
          name="slug"
          children={(field) => (
            <field.TextField
              label={m.admin_projects_form_slug_label()}
              description={m.admin_projects_form_slug_description()}
              placeholder={m.admin_projects_form_slug_placeholder()}
            />
          )}
        />

        <form.AppField
          name="shortDesc_fr"
          children={(field) => (
            <field.TextField
              locale="fr"
              label={m.admin_projects_form_short_desc_label()}
              description={m.admin_projects_form_short_desc_description()}
              placeholder={m.admin_projects_form_short_desc_placeholder()}
            />
          )}
        />

        <form.AppField
          name="shortDesc_en"
          children={(field) => (
            <field.TextField
              locale="en"
              label={m.admin_projects_form_short_desc_label()}
              description={m.admin_projects_form_short_desc_description()}
              placeholder={m.admin_projects_form_short_desc_placeholder()}
            />
          )}
        />

        <form.AppField
          name="description_fr"
          children={(field) => (
            <field.TextField
              locale="fr"
              label={m.admin_projects_form_description_label()}
              description={m.admin_projects_form_description_description()}
              placeholder={m.admin_projects_form_description_placeholder()}
            />
          )}
        />

        <form.AppField
          name="description_en"
          children={(field) => (
            <field.TextField
              locale="en"
              label={m.admin_projects_form_description_label()}
              description={m.admin_projects_form_description_description()}
              placeholder={m.admin_projects_form_description_placeholder()}
            />
          )}
        />

        <form.AppField
          name="bundler"
          children={(field) => (
            <field.AutocompleteField
              label={m.admin_projects_form_bundler_label()}
              description={m.admin_projects_form_bundler_description()}
              placeholder={m.admin_projects_form_bundler_placeholder()}
              noResult={m.admin_projects_form_bundler_no_result()}
              options={bundlerOptions}
            />
          )}
        />

        <form.AppField
          name="framework"
          children={(field) => (
            <field.AutocompleteField
              label={m.admin_projects_form_framework_label()}
              description={m.admin_projects_form_framework_description()}
              placeholder={m.admin_projects_form_framework_placeholder()}
              noResult={m.admin_projects_form_framework_no_result()}
              options={frameworkOptions}
            />
          )}
        />

        <form.AppField
          name="userInterface"
          children={(field) => (
            <field.AutocompleteField
              label={m.admin_projects_form_user_interface_label()}
              description={m.admin_projects_form_user_interface_description()}
              placeholder={m.admin_projects_form_user_interface_placeholder()}
              noResult={m.admin_projects_form_user_interface_no_result()}
              options={userInterfaceOptions}
            />
          )}
        />

        <form.AppField
          name="stateManagement"
          children={(field) => (
            <field.AutocompleteField
              label={m.admin_projects_form_state_management_label()}
              description={m.admin_projects_form_state_management_description()}
              placeholder={m.admin_projects_form_state_management_placeholder()}
              noResult={m.admin_projects_form_state_management_no_result()}
              options={stateManagementOptions}
            />
          )}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form.AppForm>
            <form.CancelButton label={m.admin_projects_form_cancel()} />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <form.AppForm>
                <form.SubmitButton
                  label={
                    project != null
                      ? m.admin_projects_form_submit_edit()
                      : m.admin_projects_form_submit_create()
                  }
                />
              </form.AppForm>

              {project != null && (
                <AdminProjectFormDeleteDialog project={project} />
              )}
            </div>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
};
