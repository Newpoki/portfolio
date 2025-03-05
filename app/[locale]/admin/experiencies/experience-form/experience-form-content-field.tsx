"use client";

import { Locale } from "@/app/[locale]/i18n/routing";
import {
  DEFAULT_EDITOR_EXTENSIONS,
  Editor,
} from "@/components/ui/editor/editor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { ExperienceFormValues } from "./experience-form-schemas";
import { Editor as EditorInstance, generateHTML } from "@tiptap/react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExperienceFormContentPreview } from "./experience-form-content-preview";

type ExperienceFormContentFieldProps = {
  name: `content_${Locale}`;
};

export const ExperienceFormContentField = ({
  name,
}: ExperienceFormContentFieldProps) => {
  const t = useTranslations("ADMIN.experiencies");

  const [isDisplayingPreview, setIsDisplayingPreview] = useState(false);

  const { control } = useFormContext<ExperienceFormValues>();
  const { field } = useController({ control, name });

  const content = generateHTML(
    JSON.parse(field.value),
    DEFAULT_EDITOR_EXTENSIONS,
  );

  const handleEditorChange = useCallback(
    ({ editor }: { editor: EditorInstance }) => {
      const stringifiedEditorState = JSON.stringify(editor.getJSON());

      field.onChange(stringifiedEditorState);
    },
    [field],
  );

  const handleTogglePreview = useCallback(() => {
    setIsDisplayingPreview((current) => !current);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={() => {
        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{t("form.content.label")}</FormLabel>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={handleTogglePreview}
              >
                {t("form.content.preview")}
              </Button>
            </div>

            <FormControl>
              {isDisplayingPreview ? (
                <ExperienceFormContentPreview content={content} />
              ) : (
                <Editor
                  content={content}
                  immediatelyRender={false}
                  onUpdate={handleEditorChange}
                />
              )}
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
