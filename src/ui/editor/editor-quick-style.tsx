import { BubbleMenu } from "@tiptap/react/menus";
import { Button } from "../button";
import type { Editor } from "@tiptap/react";
import { m } from "@/i18n/paraglide/messages";

type EditorQuickStyleProps = {
  editor: Editor;
};

export const EditorQuickStyle = ({ editor }: EditorQuickStyleProps) => {
  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleToggleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  };

  const handleSetLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    // This div here is really important, otherwise if component is unmount
    // The whole app crash, cf https://github.com/ueberdosis/tiptap/issues/2658#issuecomment-1513826220
    <div>
      <BubbleMenu editor={editor}>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 shadow">
          <Button
            onClick={handleToggleBold}
            className={editor.isActive("bold") ? "is-active" : ""}
            type="button"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
          >
            {m.generic_bold()}
          </Button>

          <Button
            onClick={handleToggleItalic}
            variant={editor.isActive("italic") ? "default" : "ghost"}
            type="button"
            size="sm"
          >
            {m.generic_italic()}
          </Button>

          <Button
            onClick={handleToggleStrike}
            variant={editor.isActive("strike") ? "default" : "ghost"}
            type="button"
            size="sm"
          >
            {m.generic_strike()}
          </Button>

          <Button
            onClick={handleSetLink}
            variant={editor.isActive("link") ? "default" : "ghost"}
            type="button"
            size="sm"
          >
            {m.generic_set_link()}
          </Button>
        </div>
      </BubbleMenu>
    </div>
  );
};
