import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../admin-experience-form-utils";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";

type AdminExperienceFormTextFieldProps = {
  description: string;
  label: string;
  placeholder: string;
};

export const AdminExperienceFormTextField = ({
  description,
  label,
  placeholder,
}: AdminExperienceFormTextFieldProps) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
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
