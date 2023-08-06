"use client";

import { Typography } from "../components/typography";
import { ExperienceTimelineSeparator } from "./experience-timeline-separator";
import { MDXRemote } from "next-mdx-remote";

type Props = {
  source: any;
  title: string;
};

export const ExperienceTimelineCard = ({ source, title }: Props) => {
  return (
    <li className="before:content-[' '] flex before:flex-1 before:p-10  [&:nth-child(2n)]:flex-row-reverse">
      <ExperienceTimelineSeparator />
      <div className="w-1/2 flex-1 p-10">
        <Typography>{title}</Typography>
        <div className="prose">
          <MDXRemote {...source} />
        </div>
      </div>
    </li>
  );
};
