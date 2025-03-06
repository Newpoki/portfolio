"use client";

import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Experiencies } from "./experiencies-actions";
import { useFormatter, useTranslations } from "next-intl";
import { generateHTML } from "@tiptap/react";
import { DEFAULT_EDITOR_EXTENSIONS } from "@/components/ui/editor/editor";
import { useMemo } from "react";
import { Locale } from "../i18n/routing";

export type ExperienceNodeData = Node<{
  hasLeftHandle: boolean;
  hasRightHandle: boolean;
  experience: Experiencies[number];
  locale: Locale;
}>;

export type ExperienceNodeProps = NodeProps<ExperienceNodeData>;

export const ExperienceNode = ({ data }: ExperienceNodeProps) => {
  const t = useTranslations("EXPERIENCIES");
  const format = useFormatter();

  const experienceContentHTML = useMemo(() => {
    return generateHTML(
      JSON.parse(data.experience[`content_${data.locale}`]),
      DEFAULT_EDITOR_EXTENSIONS,
    );
  }, [data]);

  return (
    <>
      {data.hasLeftHandle && <Handle type="target" position={Position.Left} />}

      <section className="bg-accent rounded-md border p-4 xl:p-10">
        <h2 className="mb-4">{data.experience.title}</h2>

        <p className="mb-4">
          {/* Not using format.dateTimeRange because we want "Today" instead of today date */}
          {t("period", {
            startDate: format.dateTime(data.experience.startedAt),
            endDate: data.experience.endedAt
              ? format.dateTime(data.experience.endedAt)
              : t("today"),
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
