"use client";

import { ExperienceType } from "@prisma/client";
import BirthIcon from "@/public/icons/birth.svg";
import DiplomaIcon from "@/public/icons/diploma.svg";
import WorkIcon from "@/public/icons/work.svg";
import { useMemo } from "react";

type Props = {
  type: ExperienceType;
};

export const ExperienceTimelineSeparatorIcon = ({ type }: Props) => {
  const icon = useMemo(() => {
    switch (type) {
      case "BIRTH":
        return <BirthIcon className="w-4 xl:w-6" />;
      case "DIPLOMA":
        return <DiplomaIcon className="w-4 xl:w-6" />;
      case "WORK":
        return <WorkIcon className="w-4 xl:w-6" />;
    }
  }, [type]);

  return <div className="rounded-full border-1 border-black p-2">{icon}</div>;
};
