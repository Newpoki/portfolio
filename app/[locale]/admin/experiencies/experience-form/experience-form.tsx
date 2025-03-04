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
import { useSubmitExperienceForm } from "./use-submit-experience-form";
import { ExperienceFormNameField } from "./experience-form-name-field";
import { ExperienceFormCountryField } from "./experience-form-country-field";
import { ExperienceFormCityField } from "./experience-form-city-field";
import { ExperienceFormStartedAtField } from "./experience-form-started-at-field";
import { ExperienceFormEndedAtField } from "./experience-form-ended-at-field";
import { ExperienceFormContentField } from "./experience-form-content-field";

export const ExperienceForm = () => {
  const t = useTranslations("ADMIN.experiencies");

  const { onSubmit } = useSubmitExperienceForm();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormValuesSchemas),
    defaultValues: {
      id: null,
      endedAt: null,
      title: "",
      content_en: JSON.stringify(VALID_EMPTY_EDITOR_JSON),
      content_fr: JSON.stringify(VALID_EMPTY_EDITOR_JSON),
      place: {
        city: "",
        // I've only worked in France for now, this field a bit useless but who knows
        country: "FR",
      },
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <div className="max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ExperienceFormNameField />
          <section className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <ExperienceFormCityField />

            <ExperienceFormCountryField />
          </section>

          <ExperienceFormStartedAtField />

          <ExperienceFormEndedAtField />

          <ExperienceFormContentField name="content_fr" />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {t("form.submit.label")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
