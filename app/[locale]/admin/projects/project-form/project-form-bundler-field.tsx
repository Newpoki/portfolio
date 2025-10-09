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
import { BUNDLER_OPTIONS } from "@/app/[locale]/projects/[project-slug]/project-constants";

const OPTIONS = [
  BUNDLER_OPTIONS.TURBOPACK,
  BUNDLER_OPTIONS.WEBPACK,
  BUNDLER_OPTIONS.VITE,
] as const;

export const ProjectFormBundlerField = () => {
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
      name="bundler"
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.bundler.label")}</FormLabel>
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
                      ? OPTIONS.find((bundler) => bundler.value === field.value)
                          ?.label
                      : t("form.bundler.placeholder")}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command filter={filter}>
                    <CommandInput placeholder={t("form.bundler.placeholder")} />
                    <CommandList>
                      <CommandEmpty>{t("form.bundler.no-result")}</CommandEmpty>
                      <CommandGroup>
                        {OPTIONS.map((bundler) => (
                          <CommandItem
                            key={bundler.value}
                            value={bundler.value}
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
                                field.value === bundler.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {bundler.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormDescription>{t("form.bundler.description")}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
