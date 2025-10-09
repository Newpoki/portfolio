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

export const ProjectFormNameField = () => {
  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.name.label")}</FormLabel>
            <FormControl>
              <Input placeholder={t("form.name.placeholder")} {...field} />
            </FormControl>
            <FormDescription>{t("form.name.description")}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
