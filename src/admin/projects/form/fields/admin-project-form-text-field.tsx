import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../admin-project-form-utils";
import type { Locale } from "@/i18n/paraglide/runtime";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { LocaleFlag } from "@/i18n/locale-flag";

type AdminProjectFormTextFieldProps = {
  description: string;
  label: string;
  placeholder: string;
  locale?: Locale;
};

export const AdminProjectFormTextField = ({
  description,
  label,
  placeholder,
  locale,
}: AdminProjectFormTextFieldProps) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        {label}

        {locale != null && <LocaleFlag locale={locale} />}
      </FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
      />
      <FieldDescription>{description}</FieldDescription>

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};
