"use client";

import { Locale } from "@/app/[locale]/i18n/routing";
import {
  DEFAULT_EDITOR_EXTENSIONS,
  Editor,
} from "@/components/ui/editor/editor";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { ExperienceFormValues } from "./experience-form-schemas";
import { Editor as EditorInstance, generateHTML } from "@tiptap/react";
import { useCallback } from "react";

type ExperienceFormContentFieldProps = {
  name: `content_${Locale}`;
};

export const ExperienceFormContentField = ({
  name,
}: ExperienceFormContentFieldProps) => {
  const t = useTranslations("ADMIN.experiencies");
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

  return (
    <FormItem>
      <FormLabel>{t("form.content.label")}</FormLabel>
      <FormControl>
        <Editor
          content={content}
          immediatelyRender={false}
          onUpdate={handleEditorChange}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};
