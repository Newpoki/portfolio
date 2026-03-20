import { useStore } from "@tanstack/react-form";
import { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useFieldContext } from "../admin-project-form-utils";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Option<T extends string> = { label: string; value: T };

type AdminProjectFormTextFieldProps<T extends string> = {
  description: string;
  label: string;
  noResult: string;
  options: Array<Option<T>>;
  placeholder: string;
};

export function AdminProjectFormAutocompleteField<T extends string>({
  description,
  label,
  noResult,
  options,
  placeholder,
}: AdminProjectFormTextFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const field = useFieldContext<T | "">();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  const filter = (value: string, search: string) => {
    const option = options.find((opt) => opt.value === value);

    return option?.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn("w-full justify-between", {
              "border-red-500 [&_svg]:text-red-500": isInvalid,
            })}
          >
            {field.state.value
              ? options.find((option) => option.value === field.state.value)
                  ?.label
              : placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
          <Command filter={filter}>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{noResult}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      const updatedValue = (
                        currentValue === field.state.value ? "" : currentValue
                      ) as T | "";

                      field.handleChange(updatedValue);
                      setIsOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.state.value === option.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldDescription>{description}</FieldDescription>

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}
