import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { z } from "zod";
import { useImperativeHandle } from "react";
import { EditorQuickStyle } from "./editor-quick-style";
import type {
  Editor as EditorInstance,
  EditorProviderProps,
  Extensions,
} from "@tiptap/react";
import { cn } from "@/lib/cn";

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
  { error: "Required" },
);

type EditorProps = EditorProviderProps & {
  ref: React.ForwardedRef<EditorInstance>;
};

export const Editor = ({ ref, ...props }: EditorProps) => {
  const editor = useEditor({
    ...props,
    extensions: DEFAULT_EDITOR_EXTENSIONS,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "border px-3 py-2 rounded-md border-input editor shadow-xs transition-[color,box-shadow] outline-none min-h-30 max-h-80 overflow-y-auto",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        ),
      },
    },
  });

  useImperativeHandle(ref, () => editor as EditorInstance, [editor]);

  return (
    <div>
      {editor != null && <EditorQuickStyle editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
