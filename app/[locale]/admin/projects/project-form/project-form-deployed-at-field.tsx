import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormatter, useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { AdminProjectFormValues } from "./project-form-schemas";

export const ProjectFormDeployedAtField = () => {
  const t = useTranslations("ADMIN.projects");
  const format = useFormatter();

  const { control } = useFormContext<AdminProjectFormValues>();

  return (
    <FormField
      control={control}
      name="deployedAt"
      render={({ field, fieldState }) => {
        const displayedDate =
          field.value != null && !isNaN(new Date(field.value).getTime())
            ? format.dateTime(new Date(field.value))
            : t("form.deployed-at.placeholder");

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{t("form.deployed-at.label")}</FormLabel>

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                      {
                        "border-red-500 [&_svg]:text-red-500": fieldState.error,
                      },
                    )}
                  >
                    {displayedDate}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(day) => {
                    const newValue = day ? day.toISOString() : null;

                    field.onChange(newValue);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormDescription>
              {t("form.deployed-at.description")}
            </FormDescription>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
