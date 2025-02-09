"use client";

import { Typography } from "@/app/components/typography";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Experiencies } from "./experiencies-actions";

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
  const displayedStartedAt = Intl.DateTimeFormat("en").format(
    data.experience.startedAt
  );

  const displayedEndedAt = data.experience.endedAt
    ? Intl.DateTimeFormat("en").format(data.experience.endedAt)
    : "Today";

  return (
    <>
      {data.hasLeftHandle && <Handle type="target" position={Position.Left} />}

      <section className="rounded-md border-1 border-gray-500 bg-white p-4 xl:p-10">
        <Typography variant="h2" className="mb-4">
          {data.experience.title}
        </Typography>

        <Typography variant="body2" className="mb-4">
          {displayedStartedAt} - {displayedEndedAt}
        </Typography>

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
