"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor/editor";
import { updateExperience } from "./admin-form-action";
import { useState } from "react";
import { AdminEditorPreview } from "./admin-editor-preview";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const AdminForm = ({ content }: { content: string }) => {
  const [val, setVal] = useState<string>("{}");

  const handleClick = async () => {
    const formData = new FormData();

    if (val != null) {
      formData.append("content_fr", val);
    }

    await updateExperience(formData);
  };

  console.log(JSON.parse(content));

  return (
    <div>
      <Editor
        content={generateHTML(JSON.parse(content), [
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
        ])}
        immediatelyRender={false}
        onUpdate={(prop) => {
          setVal(JSON.stringify(prop.editor.getJSON()));
        }}
        slotAfter={<AdminEditorPreview />}
      />
      <Button onClick={handleClick}>submit</Button>
    </div>
  );
};
