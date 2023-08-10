"use client";

import { Experience } from "@prisma/client";
import { Typography } from "../components/typography";
import { ExperienceTimelineSeparator } from "./experience-timeline-separator";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { SlightlySlideUp } from "../components/slightly-slide-up";

type Props = Omit<Experience, "content"> & {
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

export const ExperienceTimelineCard = ({
  type,
  content,
  title,
  startedAt,
  endedAt,
}: Props) => {
  const displayedStartedAt = Intl.DateTimeFormat().format(startedAt);
  const displayedEndedAt = endedAt
    ? Intl.DateTimeFormat().format(endedAt)
    : "Today";

  return (
    <SlightlySlideUp
      as="li"
      className="before:content-[' '] flex animation-delay-[900ms] before:hidden before:flex-1 before:border-1 before:border-transparent before:p-10 xl:before:block xl:[&:nth-child(2n)]:flex-row-reverse"
    >
      <ExperienceTimelineSeparator type={type} />

      <div className="mb-6 w-1/2 flex-1 rounded-md border-1 border-gray-600 p-10">
        <Typography className="mb-4 uppercase" variant="h2">
          {title}
        </Typography>

        <Typography className="mb-4 font-semibold" variant="body2">
          {displayedStartedAt} - {displayedEndedAt}
        </Typography>

        <div className="prose">
          <MDXRemote {...content} />
        </div>
      </div>
    </SlightlySlideUp>
  );
};
