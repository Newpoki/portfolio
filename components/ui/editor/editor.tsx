"use client";

import { EditorProvider, Extensions, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorQuickStyle } from "./editor-quick-style";

const extensions: Extensions = [
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

type EditorProps = EditorProviderProps;

export const Editor = (props: EditorProps) => {
  return (
    <EditorProvider
      {...props}
      extensions={extensions}
      editorProps={{
        attributes: {
          class: "border p-4 rounded border-border outline-ring editor",
        },
      }}
    >
      <EditorQuickStyle />
    </EditorProvider>
  );
};
