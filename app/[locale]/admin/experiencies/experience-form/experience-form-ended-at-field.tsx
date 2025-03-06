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

export const ExperienceFormEndedAtField = () => {
  const t = useTranslations("ADMIN.experiencies");
  const format = useFormatter();

  const { control } = useFormContext<ExperienceFormValues>();

  return (
    <FormField
      control={control}
      name="endedAt"
      render={({ field }) => {
        const displayedDate =
          field.value != null && !isNaN(new Date(field.value).getTime())
            ? format.dateTime(new Date(field.value))
            : t("form.endedAt.placeholder");

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
                  onSelect={(day) => {
                    const newValue = day ? day.toISOString() : null;

                    field.onChange(newValue);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormDescription>{t("form.endedAt.description")}</FormDescription>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
