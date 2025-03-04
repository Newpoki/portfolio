"use client";

import { useForm } from "react-hook-form";
import {
  ExperienceFormValues,
  experienceFormValuesSchemas,
} from "./experience-form-schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useTranslations } from "next-intl";
import {
  DEFAULT_EDITOR_EXTENSIONS,
  Editor,
  VALID_EMPTY_JSON,
} from "@/components/ui/editor/editor";
import { generateHTML } from "@tiptap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminEditorPreview } from "../../admin-editor-preview";
import { useSubmitExperienceForm } from "./use-submit-experience-form";

export const ExperienceForm = () => {
  const t = useTranslations("ADMIN.experiencies");

  const { onSubmit } = useSubmitExperienceForm();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormValuesSchemas),
    defaultValues: {
      id: null,
      endedAt: null,
      title: "",
      content_en: JSON.stringify(VALID_EMPTY_JSON),
      content_fr: JSON.stringify(VALID_EMPTY_JSON),
      place: {
        city: "",
        country: "FR",
      },
    },
  });

  const { isSubmitting } = form.formState;

  return (
    <div className="max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("form.name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("form.name.placeholder")} {...field} />
                </FormControl>
                <FormDescription>{t("form.name.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="place.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.place.city.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.place.city.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.place.city.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="place.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.place.country.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.place.country.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("form.place.country.description")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <FormField
            control={form.control}
            name="startedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("form.startDate.label")}</FormLabel>
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
                        {field.value ? (
                          field.value.toString()
                        ) : (
                          <span>{t("form.startDate.placeholder")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={(day) =>
                        day != null ? field.onChange(day?.toISOString()) : null
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {t("form.startDate.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("form.endDate.label")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          //   format(field.value, "PPP")
                          field.value.toString()
                        ) : (
                          <span>{t("form.endDate.placeholder")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(day) =>
                        day != null ? field.onChange(day?.toISOString()) : null
                      }
                      initialFocus
                      disabled={(date) => {
                        const startedAt = form.getValues("startedAt");
                        return startedAt ? date < new Date(startedAt) : false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  {t("form.endDate.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content_fr"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("form.content.label")}</FormLabel>
                  <FormControl>
                    <Editor
                      content={generateHTML(
                        JSON.parse(field.value),
                        DEFAULT_EDITOR_EXTENSIONS,
                      )}
                      immediatelyRender={false}
                      onUpdate={(prop) => {
                        const stringifiedEditorState = JSON.stringify(
                          prop.editor.getJSON(),
                        );

                        console.log({ stringifiedEditorState });

                        field.onChange(stringifiedEditorState);
                      }}
                      slotAfter={<AdminEditorPreview />}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            {t("form.submit.label")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
