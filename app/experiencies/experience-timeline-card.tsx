"use client";

import { MDXProvider } from "@mdx-js/react";
import { Typography } from "../components/typography";
import { ExperienceTimelineSeparator } from "./experience-timeline-separator";
import { Link } from "../components/link";

type Props = {
  children: any;
  title: string;
};

const components = {
  a: (props: any) => <Link {...props} type="external" />,
  b: () => {
    return <span>lol</span>;
  },
};

export const ExperienceTimelineCard = ({ children, title }: Props) => {
  return (
    <li className="before:content-[' '] flex before:flex-1 before:p-10  [&:nth-child(2n)]:flex-row-reverse">
      <ExperienceTimelineSeparator />
      <div className="mb-16 w-1/2 flex-1 p-10">
        <Typography>{title}</Typography>
        <p>{children}</p>
        {/* <MDXProvider components={components}>{children}</MDXProvider> */}
      </div>
    </li>
  );
};
