import { useStore } from "@tanstack/react-form";
import { generateHTML } from "@tiptap/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { ClientOnly } from "@tanstack/react-router";
import { useFieldContext } from "../admin-experience-form-utils";
import type { Editor as EditorInstance, JSONContent } from "@tiptap/react";
import type { Locale } from "@/i18n/paraglide/runtime";
import { Field, FieldError, FieldLabel } from "@/ui/field";
import { Button } from "@/ui/button";
import { m } from "@/i18n/paraglide/messages";
import { DEFAULT_EDITOR_EXTENSIONS, Editor } from "@/ui/editor/editor";
import { LocaleFlag } from "@/i18n/locale-flag";
import { Skeleton } from "@/ui/skeleton";

type AdminExperienceFormEditorFieldProps = {
  label: string;
  locale: Locale;
};

export const AdminExperienceFormEditorField = ({
  label,
  locale,
}: AdminExperienceFormEditorFieldProps) => {
  const [isDisplayingPreview, setIsDisplayingPreview] = useState(false);

  const editorRef = useRef<EditorInstance>(null);

  const field = useFieldContext<string>();

  const errors = useStore(field.store, (state) => state.meta.errors);
  const isInvalid = useStore(
    field.store,
    (state) => state.meta.isTouched && !state.meta.isValid,
  );

  const content = useMemo(() => {
    const getContent = createIsomorphicFn()
      .client(() =>
        generateHTML(
          JSON.parse(field.state.value) as JSONContent,
          DEFAULT_EDITOR_EXTENSIONS,
        ),
      )
      .server(() => "");

    return getContent();
  }, [field.state.value]);

  const handleEditorChange = ({ editor }: { editor: EditorInstance }) => {
    const stringifiedEditorState = JSON.stringify(editor.getJSON());

    field.handleChange(stringifiedEditorState);
  };

  const handleTogglePreview = () => {
    setIsDisplayingPreview((current) => !current);
  };

  useEffect(() => {
    // As TipTap internally uses it's own state, and field.value.change doesn't trigger re-render
    // We have to manually handle state change like this
    const editor = editorRef.current;
    if (editor == null) return;

    const currentContent = JSON.stringify(editor.getJSON());

    if (currentContent !== field.state.value) {
      editor.commands.setContent(JSON.parse(field.state.value) as JSONContent);
    }
  }, [field.state.value]);

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex items-center justify-between gap-2">
        <FieldLabel>
          {label}

          <LocaleFlag locale={locale} />
        </FieldLabel>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={handleTogglePreview}
        >
          {m.admin_experiencies_form_content_preview()}
        </Button>
      </div>

      {isDisplayingPreview ? (
        <div
          className="editor-preview border-input bg-input max-h-80 min-h-30 overflow-y-auto rounded-md border px-3 py-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <ClientOnly fallback={<Skeleton className="h-80 w-full" />}>
          <Editor
            ref={editorRef}
            content={content}
            immediatelyRender
            onUpdate={handleEditorChange}
          />
        </ClientOnly>
      )}

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
};
