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
import { Link } from "@/components/ui/link";
import { SquareArrowUpRightIcon } from "lucide-react";

export const ProjectFormWebsiteURLField = () => {
  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name="websiteUrl"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="flex justify-between">
              {t("form.website-url.label")}

              <Link href={field.value} type="external" animation={null}>
                <SquareArrowUpRightIcon className="w-4" />
              </Link>
            </FormLabel>

            <FormControl>
              <Input
                placeholder={t("form.website-url.placeholder")}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t("form.website-url.description")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
