"use client";

import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Experiencies } from "./experiencies-actions";
import { useFormatter, useTranslations } from "next-intl";

export type ExperienceNodeData = Node<{
  hasLeftHandle: boolean;
  hasRightHandle: boolean;
  experience: Experiencies[number];
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}>;

export type ExperienceNodeProps = NodeProps<ExperienceNodeData>;

export const ExperienceNode = ({ data }: ExperienceNodeProps) => {
  const t = useTranslations("EXPERIENCIES");
  const format = useFormatter();

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

        <div className="prose">
          <MDXRemote {...data.content} />
        </div>
      </section>

      {data.hasRightHandle && (
        <Handle type="source" position={Position.Right} id="a" />
      )}
    </>
  );
};
