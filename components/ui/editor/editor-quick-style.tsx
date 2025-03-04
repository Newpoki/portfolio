"use client";

import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { Button } from "../button";

export const EditorQuickStyle = () => {
  const { editor } = useCurrentEditor();

  if (editor == null) {
    return null;
  }

  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleToggleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  };

  return (
    // This div here is really important, otherwise if component is unmount
    // The whole app crash, cf https://github.com/ueberdosis/tiptap/issues/2658#issuecomment-1513826220
    <div>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bg-background border-border flex items-center gap-2 rounded-xl border p-2 shadow">
          <Button
            onClick={handleToggleBold}
            className={editor.isActive("bold") ? "is-active" : ""}
            type="button"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
          >
            {"Bold"}
          </Button>

          <Button
            onClick={handleToggleItalic}
            variant={editor.isActive("italic") ? "default" : "ghost"}
            type="button"
            size="sm"
          >
            {"Italic"}
          </Button>

          <Button
            onClick={handleToggleStrike}
            variant={editor.isActive("strike") ? "default" : "ghost"}
            type="button"
            size="sm"
          >
            {"Strike"}
          </Button>
        </div>
      </BubbleMenu>
    </div>
  );
};
