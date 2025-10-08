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
import { UserInterfaceLibrary } from "@prisma/client";

const USER_INTERFACE_LIBRARY_OPTIONS = [
  { value: UserInterfaceLibrary.SHADCN, label: "Shadcn" },
  { value: UserInterfaceLibrary.TAILWIND_CSS, label: "Tailwind CSS" },
  { value: UserInterfaceLibrary.MATERIAL_UI, label: "Material UI" },
  { value: UserInterfaceLibrary.STYLED_COMPONENTS, label: "Styled components" },
] as const;

export const ProjectFormUserInterfaceField = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("ADMIN.projects");
  const { control } = useFormContext<AdminProjectFormValues>();

  const filter = useCallback((value: string, search: string) => {
    const option = USER_INTERFACE_LIBRARY_OPTIONS.find(
      (option) => option.value === value,
    );

    return option?.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  }, []);

  return (
    <FormField
      control={control}
      name="userInterface"
      render={({ field, fieldState }) => {
        return (
          <FormItem>
            <FormLabel>{t("form.user-interface.label")}</FormLabel>
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
                      ? USER_INTERFACE_LIBRARY_OPTIONS.find(
                          (userInterface) =>
                            userInterface.value === field.value,
                        )?.label
                      : "Select user-interface..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                >
                  <Command filter={filter}>
                    <CommandInput placeholder="Search user-interface..." />
                    <CommandList>
                      <CommandEmpty>
                        {t("form.user-interface.no-result")}
                      </CommandEmpty>
                      <CommandGroup>
                        {USER_INTERFACE_LIBRARY_OPTIONS.map((userInterface) => (
                          <CommandItem
                            key={userInterface.value}
                            value={userInterface.value}
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
                                field.value === userInterface.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {userInterface.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormDescription>
              {t("form.user-interface.description")}
            </FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
