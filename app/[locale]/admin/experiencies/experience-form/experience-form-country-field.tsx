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

export const ExperienceFormCountryField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const { control } = useFormContext<ExperienceFormValues>();

  return (
    <FormField
      control={control}
      name="place.country"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.place.country.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("form.place.country.placeholder")}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("form.place.country.description")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
