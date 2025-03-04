import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { ExperienceFormValues } from "./experience-form-schemas";

export const ExperienceFormNameField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const { control } = useFormContext<ExperienceFormValues>();

  const { field } = useController({ control, name: "title" });

  return (
    <FormItem>
      <FormLabel>{t("form.title.label")}</FormLabel>
      <FormControl>
        <Input placeholder={t("form.title.placeholder")} {...field} />
      </FormControl>
      <FormDescription>{t("form.title.description")}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
