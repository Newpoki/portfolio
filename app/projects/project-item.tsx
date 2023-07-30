import Image from "next/image";
import { IProjectSummary } from "./types";
import { Typography } from "../components/typography";

type Props = {
  project: IProjectSummary;
};

export const ProjectItem = ({ project }: Props) => {
  return (
    <li className="group/project-item relative aspect-square">
      <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={project.illustration}
            alt={project.alt}
            fill
            className="!relative object-cover transition duration-300 group-hover/project-item:scale-110"
          />

          <div className="absolute left-2/4 top-2/4 z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 items-center rounded-full bg-white p-4 text-center shadow-xl transition-all duration-300 group-hover/project-item:scale-100">
            View project
          </div>
        </div>
      </a>
    </li>
  );
};
