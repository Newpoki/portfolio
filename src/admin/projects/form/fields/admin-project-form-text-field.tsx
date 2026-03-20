import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../admin-project-form-utils";
import type { Locale } from "@/paraglide/runtime";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { I18NFlag } from "@/components/i18n/i18n-flag";

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

        {locale != null && <I18NFlag locale={locale} />}
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
