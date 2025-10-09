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

export const ProjectFormIllustrationAltField = () => {
  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name="illustrationAlt"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.illustration-alt.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("form.illustration-alt.placeholder")}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("form.illustration-alt.description")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
