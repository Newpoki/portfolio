import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ExperienceFormValues } from "./experience-form-schemas";

export const ExperienceFormCityField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const { control } = useFormContext<ExperienceFormValues>();

  return (
    <FormField
      control={control}
      name="place.city"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.place.city.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("form.place.city.placeholder")}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("form.place.city.description")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
