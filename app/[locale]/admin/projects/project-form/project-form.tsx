"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminProjectFormValues,
  adminProjectFormValuesSchema,
} from "./project-form-schemas";
import { Project } from "@prisma/client";
import { Form } from "@/components/ui/form";
import { ProjectFormNameField } from "./project-form-name-field";
import { ProjectFormShortDescField } from "./project-form-short-desc-field";
import { ProjectFormIllustrationField } from "./project-form-illustration-field";
import { ProjectFormDescriptionField } from "./project-form-description-field";
import { ProjectFormDeployedAtField } from "./project-form-deployed-at-field";
import { ProjectFormBundlerField } from "./project-form-bundler-field";
import { ProjectFormFrameworkField } from "./project-form-framework-field";
import { ProjectFormUserInterfaceField } from "./project-form-user-interface-field";
import { ProjectFormIllustrationAltField } from "./project-form-illustration-alt-field";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { ProjectFormGithubURLField } from "./project-form-github-url-field ";
import { ProjectFormWebsiteURLField } from "./project-form-website-url-field ";
import { useProjectForm } from "./use-project-form";
import { ProjectFormSlugField } from "./project-form-slug-field";
import { ProjectFormIsFavoriteField } from "./project-form-is-favorite-field";
import { ProjectFormDeleteDialog } from "./project-form-delete-dialog";

type AdminProjectFormProps = {
  project?: Project;
};

export const AdminProjectForm = ({ project }: AdminProjectFormProps) => {
  const t = useTranslations("ADMIN.projects");

  const { onSubmit } = useProjectForm();

  const form = useForm<AdminProjectFormValues>({
    resolver: zodResolver(adminProjectFormValuesSchema),
    defaultValues: {
      id: project?.id ?? null,
      name: project?.name ?? "",
      deployedAt: project?.deployedAt.toISOString() ?? "",
      shortDesc_fr: project?.shortDesc_fr ?? "",
      shortDesc_en: project?.shortDesc_en ?? "",
      description_fr: project?.description_fr ?? "",
      description_en: project?.description_en ?? "",
      illustration: project?.illustration ?? "",
      illustrationAlt: project?.illustrationAlt ?? "",
      githubUrl: project?.githubUrl ?? undefined,
      websiteUrl: project?.websiteUrl ?? undefined,
      slug: project?.slug ?? "",
      bundler: project?.bundler,
      framework: project?.framework,
      userInterface: project?.userInterface,
      isFavorite: project?.isFavorite ?? false,
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <div className="max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ProjectFormIsFavoriteField />

          <section className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
            <ProjectFormNameField />

            <ProjectFormDeployedAtField />
          </section>

          <section className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
            <ProjectFormIllustrationField />

            <ProjectFormIllustrationAltField />
          </section>

          <section className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
            <ProjectFormGithubURLField />

            <ProjectFormWebsiteURLField />
          </section>

          <ProjectFormSlugField />

          <ProjectFormShortDescField name="shortDesc_fr" locale="fr" />

          <ProjectFormShortDescField name="shortDesc_en" locale="en" />

          <ProjectFormDescriptionField name="description_fr" locale="fr" />

          <ProjectFormDescriptionField name="description_en" locale="en" />

          <ProjectFormBundlerField />

          <ProjectFormFrameworkField />

          <ProjectFormUserInterfaceField />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <Button disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="animate-spin" />}

              {/* TODO: Add cancel button and for experience too just form.reset */}
              {project != null
                ? t("form.submit.edit")
                : t("form.submit.create")}
            </Button>

            {project != null && <ProjectFormDeleteDialog project={project} />}
          </div>
        </form>
      </Form>
    </div>
  );
};
