import { ExperienceType } from "@prisma/client";
import { ExperienceTimelineSeparatorIcon } from "./experience-timeline-separator-icon";

type Props = {
  type: ExperienceType;
};

export const ExperienceTimelineSeparator = ({ type }: Props) => {
  return (
    <div className="flex flex-col items-center pr-4 xl:px-4">
      <div className="flex w-0.5 flex-grow bg-black" />
      <ExperienceTimelineSeparatorIcon type={type} />
      <div className="flex w-0.5 flex-grow bg-black" />
    </div>
  );
};
