import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { ExperienceFormValues } from "./experience-form-schemas";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useCallback } from "react";

export const ExperienceFormEndedAtField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const { control } = useFormContext<ExperienceFormValues>();

  const { field } = useController({ control, name: "endedAt" });

  const displayedDate =
    field.value?.toString() ?? t("form.endedAt.placeholder");

  const handleChangeDate = useCallback(
    (day: Date | undefined) => {
      const newValue = day ? day.toISOString() : null;

      field.onChange(newValue);
    },
    [field],
  );

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{t("form.endedAt.label")}</FormLabel>

      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground",
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
            onSelect={handleChangeDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <FormDescription>{t("form.endedAt.description")}</FormDescription>

      <FormMessage />
    </FormItem>
  );
};
