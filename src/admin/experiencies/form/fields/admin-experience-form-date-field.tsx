import { useStore } from "@tanstack/react-form";
import { CalendarIcon } from "lucide-react";
import { useFieldContext } from "../admin-experience-form-utils";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Button } from "@/ui/button";
import { cn } from "@/lib/cn";
import { Calendar } from "@/ui/calendar";

type AdminExperienceFormDateFieldProps = {
  description: string;
  label: string;
  placeholder: string;
};

export const AdminExperienceFormDateField = ({
  description,
  label,
  placeholder,
}: AdminExperienceFormDateFieldProps) => {
  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  const displayedDate = !isNaN(new Date(field.state.value).getTime())
    ? new Date(field.state.value).toLocaleDateString(navigator.language)
    : placeholder;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.state.value && "text-muted-foreground",
            )}
          >
            {displayedDate}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="single"
            selected={new Date(field.state.value)}
            onSelect={(day) => {
              const newValue = day ? day.toISOString() : null;

              if (newValue == null) return;

              field.handleChange(newValue);
            }}
          />
        </PopoverContent>
      </Popover>
      <FieldDescription>{description}</FieldDescription>

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};
