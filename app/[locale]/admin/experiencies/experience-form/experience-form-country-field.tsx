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

export const ExperienceFormCountryField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const { control } = useFormContext<ExperienceFormValues>();

  const { field } = useController({ control, name: "place.country" });

  return (
    <FormItem>
      <FormLabel>{t("form.place.country.label")}</FormLabel>
      <FormControl>
        <Input placeholder={t("form.place.country.placeholder")} {...field} />
      </FormControl>
      <FormDescription>{t("form.place.country.description")}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
