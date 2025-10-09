"use client";

import { useForm } from "react-hook-form";
import {
  ExperienceFormValues,
  experienceFormValuesSchemas,
} from "./experience-form-schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { VALID_EMPTY_EDITOR_JSON } from "@/components/ui/editor/editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceFormNameField } from "./experience-form-name-field";
import { ExperienceFormCountryField } from "./experience-form-country-field";
import { ExperienceFormCityField } from "./experience-form-city-field";
import { ExperienceFormStartedAtField } from "./experience-form-started-at-field";
import { ExperienceFormEndedAtField } from "./experience-form-ended-at-field";
import { ExperienceFormContentField } from "./experience-form-content-field";
import { Experience } from "@prisma/client";
import { useExperienceForm } from "./use-experience-form";
import { ExperienceFormDeleteDialog } from "./experience-form-delete-dialog";
import { useCallback } from "react";

type ExperienceFormProps = {
  experience?: Experience;
};

export const ExperienceForm = ({ experience }: ExperienceFormProps) => {
  const t = useTranslations("ADMIN.experiencies");

  const { onSubmit } = useExperienceForm();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormValuesSchemas),
    defaultValues: {
      id: experience?.id ?? null,
      startedAt: experience?.startedAt.toISOString() ?? "",
      endedAt: experience?.endedAt?.toISOString() ?? null,
      title: experience?.title ?? "",
      content_en: experience?.content_en
        ? experience?.content_en
        : JSON.stringify(VALID_EMPTY_EDITOR_JSON),
      content_fr: experience?.content_fr
        ? experience?.content_fr
        : JSON.stringify(VALID_EMPTY_EDITOR_JSON),
      place: {
        // @ts-expect-error Bad type
        city: experience?.place?.city ?? "",
        // I've only worked in France for now, this field a bit useless but who knows
        // @ts-expect-error Bad type
        country: experience?.place?.country ?? "FR",
      },
    },
  });

  const { isSubmitting } = form.formState;

  const handleReset = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <div className="max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ExperienceFormNameField />

          <section className="grid grid-cols-1 items-baseline gap-8 sm:grid-cols-2">
            <ExperienceFormCityField />

            <ExperienceFormCountryField />
          </section>

          <ExperienceFormStartedAtField />

          <ExperienceFormEndedAtField />

          <ExperienceFormContentField name="content_fr" locale="fr" />

          <ExperienceFormContentField name="content_en" locale="en" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={handleReset} type="button">
              {t("form.cancel")}
            </Button>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button disabled={isSubmitting}>
                {isSubmitting && <Loader2Icon className="animate-spin" />}

                {experience != null
                  ? t("form.submit.edit")
                  : t("form.submit.create")}
              </Button>

              {experience != null && (
                <ExperienceFormDeleteDialog experience={experience} />
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
