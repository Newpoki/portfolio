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

export const ProjectFormGithubURLField = () => {
  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name="githubUrl"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.github-url.label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("form.github-url.placeholder")}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("form.github-url.description")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
