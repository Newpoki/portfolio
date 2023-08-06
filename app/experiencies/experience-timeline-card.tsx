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
    <li className="before:content-[' '] flex before:hidden before:flex-1 before:border-1 before:border-transparent before:p-10 xl:before:block xl:[&:nth-child(2n)]:flex-row-reverse">
      <ExperienceTimelineSeparator />

      <div className="mb-6 w-1/2 flex-1 rounded-md border-1 border-gray-600 p-10">
        <Typography className="mb-4">{title}</Typography>

        <div className="prose">
          <MDXRemote {...source} />
        </div>
      </div>
    </li>
  );
};
