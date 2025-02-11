"use client";

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
    data.experience.startedAt,
  );

  const displayedEndedAt = data.experience.endedAt
    ? Intl.DateTimeFormat("en").format(data.experience.endedAt)
    : "Today";

  return (
    <>
      {data.hasLeftHandle && <Handle type="target" position={Position.Left} />}

      <section className="rounded-md border bg-background p-4 xl:p-10">
        <h2 className="mb-4">{data.experience.title}</h2>

        <p className="mb-4">
          {displayedStartedAt} - {displayedEndedAt}
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
