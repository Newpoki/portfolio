import { useStore } from "@tanstack/react-form";
import { SquareArrowUpRightIcon } from "lucide-react";
import { useFieldContext } from "../admin-project-form-utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";

type AdminProjectFormLinkFieldProps = {
  description: string;
  label: string;
  placeholder: string;
};

export const AdminProjectFormLinkField = ({
  description,
  label,
  placeholder,
}: AdminProjectFormLinkFieldProps) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="flex justify-between">
        {label}

        <Link href={field.state.value} type="external" animation={null}>
          <SquareArrowUpRightIcon className="w-4" />
        </Link>
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
