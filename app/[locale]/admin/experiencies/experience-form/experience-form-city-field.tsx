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

export const ExperienceFormCityField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const { control } = useFormContext<ExperienceFormValues>();

  const { field } = useController({ control, name: "place.city" });

  return (
    <FormItem>
      <FormLabel>{t("form.place.city.label")}</FormLabel>
      <FormControl>
        <Input placeholder={t("form.place.city.placeholder")} {...field} />
      </FormControl>
      <FormDescription>{t("form.place.city.description")}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
