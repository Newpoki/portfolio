import { Handle, Position } from "@xyflow/react";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/react";
import type { Node, NodeProps } from "@xyflow/react";
import type { Experience } from "@prisma/client";
import type { Locale } from "@/paraglide/runtime";
import { getLocale } from "@/paraglide/runtime";
import { m } from "@/paraglide/messages";
import { DEFAULT_EDITOR_EXTENSIONS } from "@/components/ui/editor/editor";

export type ExperienceNodeData = Node<{
  hasLeftHandle: boolean;
  hasRightHandle: boolean;
  experience: Experience;
  locale: Locale;
}>;

export type ExperienceNodeProps = NodeProps<ExperienceNodeData>;

export const ExperienceNode = ({ data }: ExperienceNodeProps) => {
  const locale = getLocale();

  const experienceContentHTML = useMemo(() => {
    return generateHTML(
      JSON.parse(data.experience[`content_${data.locale}`]) ?? "",
      DEFAULT_EDITOR_EXTENSIONS,
    );
  }, [data]);

  return (
    <>
      {data.hasLeftHandle && <Handle type="target" position={Position.Left} />}

      <section className="bg-accent rounded-md border p-4 xl:p-10">
        <h2 className="mb-4">{data.experience.title}</h2>

        <p className="mb-4">
          {m.experiencies_period({
            startDate: new Intl.DateTimeFormat(locale, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(data.experience.startedAt)),

            endDate: data.experience.endedAt
              ? new Intl.DateTimeFormat(locale, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(data.experience.endedAt))
              : m.experiencies_today(),
          })}
        </p>

        <div
          className="editor-preview"
          dangerouslySetInnerHTML={{ __html: experienceContentHTML }}
        />
      </section>

      {data.hasRightHandle && (
        <Handle type="source" position={Position.Right} id="a" />
      )}
    </>
  );
};
