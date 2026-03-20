import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "../admin-project-form-utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

type AdminProjectFormSwitchProps = {
  description: string;
  label: string;
};

export const AdminProjectFormSwitch = ({
  description,
  label,
}: AdminProjectFormSwitchProps) => {
  const field = useFieldContext<boolean>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation="horizontal"
      className="justify-between rounded-lg border p-3 shadow-sm"
    >
      <div className="space-y-0.5">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <FieldDescription>{description}</FieldDescription>
      </div>

      <Switch
        name={field.name}
        id={field.name}
        size="default"
        checked={field.state.value}
        onCheckedChange={field.handleChange}
      />

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};
