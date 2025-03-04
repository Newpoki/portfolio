"use client";

import { generateHTML, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const AdminEditorPreview = () => {
  const { editor } = useCurrentEditor();

  if (editor == null) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHTML(editor.getJSON(), [StarterKit]),
      }}
    />
  );
};
