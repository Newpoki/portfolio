"use client";

import { EditorProvider, Extensions, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorQuickStyle } from "./editor-quick-style";
import { cn } from "@/lib/utils";
import { z } from "zod";

export const DEFAULT_EDITOR_EXTENSIONS: Extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export const VALID_EMPTY_EDITOR_JSON = {
  type: "doc",
  content: [],
};

export const emptyEditorRuleSchema = z.string().refine(
  (value) => {
    try {
      return value !== JSON.stringify(VALID_EMPTY_EDITOR_JSON);
    } catch {
      return false;
    }
  },
  { message: "Required" },
);

type EditorProps = EditorProviderProps;

export const Editor = (props: EditorProps) => {
  return (
    <EditorProvider
      {...props}
      extensions={DEFAULT_EDITOR_EXTENSIONS}
      editorProps={{
        attributes: {
          class: cn(
            "border px-3 py-2 rounded-md border-input editor shadow-xs transition-[color,box-shadow] outline-none min-h-30",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          ),
        },
      }}
    >
      <EditorQuickStyle />
    </EditorProvider>
  );
};
