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
import { AdminProjectFormValues } from "./project-form-schemas";

export const ProjectFormSlugField = () => {
  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name="slug"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.slug.label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("form.slug.placeholder")} {...field} />
            </FormControl>
            <FormDescription>{t("form.slug.description")}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
