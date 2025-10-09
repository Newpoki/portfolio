import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AdminProjectFormValues } from "./project-form-schemas";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FRAMEWORK_OPTIONS } from "@/app/[locale]/projects/[project-slug]/project-constants";

const OPTIONS = [
  FRAMEWORK_OPTIONS.NEXT,
  FRAMEWORK_OPTIONS.REACT,
  FRAMEWORK_OPTIONS.TANSTACK_START,
] as const;

export const ProjectFormFrameworkField = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  const filter = useCallback((value: string, search: string) => {
    const option = OPTIONS.find((option) => option.value === value);

    return option?.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  }, []);

  return (
    <FormField
      control={control}
      name="framework"
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.framework.label")}</FormLabel>
            <FormControl>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className={cn("w-full justify-between", {
                      "border-red-500 [&_svg]:text-red-500": fieldState.error,
                    })}
                  >
                    {field.value
                      ? OPTIONS.find(
                          (framework) => framework.value === field.value,
                        )?.label
                      : "Select framework..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                >
                  <Command filter={filter}>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>
                        {t("form.framework.no-result")}
                      </CommandEmpty>
                      <CommandGroup>
                        {OPTIONS.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === field.value
                                  ? ""
                                  : currentValue,
                              );
                              setIsOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormDescription>{t("form.framework.description")}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
