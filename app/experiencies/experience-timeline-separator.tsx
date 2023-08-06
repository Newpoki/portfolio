import { ExperienceType } from "@prisma/client";
import { ExperienceTimelineSeparatorIcon } from "./experience-timeline-separator-icon";

type Props = {
  type: ExperienceType;
};

export const ExperienceTimelineSeparator = ({ type }: Props) => {
  return (
    <div className="flex flex-col items-center px-4 pl-0 xl:pl-4">
      <div className="flex w-0.5 flex-grow bg-black" />
      {/* <div className="h-8 w-8 bg-red-500" /> */}
      <ExperienceTimelineSeparatorIcon type={type} />
      <div className="flex w-0.5 flex-grow bg-black" />
    </div>
  );
};
