"use client";

import { DEFAULT_EDITOR_EXTENSIONS } from "@/components/ui/editor/editor";
import { generateHTML, useCurrentEditor } from "@tiptap/react";

export const ExperienceFormContentPreview = () => {
  const { editor } = useCurrentEditor();

  if (editor == null) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHTML(editor.getJSON(), DEFAULT_EDITOR_EXTENSIONS),
      }}
    />
  );
};
