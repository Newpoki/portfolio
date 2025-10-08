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
import { Locale } from "@/app/[locale]/i18n/routing";
import { I18NFlag } from "@/app/[locale]/i18n/i18n-flag";

type ProjectFormShortDescFieldProps = {
  name: `shortDesc_${Locale}`;
  locale: Locale;
};

export const ProjectFormShortDescField = ({
  name,
  locale,
}: ProjectFormShortDescFieldProps) => {
  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              {t(`form.short-desc.label`)}

              <I18NFlag locale={locale} />
            </FormLabel>
            <FormControl>
              <Input
                placeholder={t(`form.short-desc.placeholder`)}
                {...field}
              />
            </FormControl>
            <FormDescription>
              {t(`form.short-desc.description`)}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
