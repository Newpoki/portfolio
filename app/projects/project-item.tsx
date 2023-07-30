import Image from "next/image";
import { IProjectSummary } from "./types";
import classNames from "classnames";
import { fadeInAnimationClassname } from "../components/fade-in";

type Props = {
  index: number;
  project: IProjectSummary;
};

export const ProjectItem = ({ index, project }: Props) => {
  return (
    <li
      className={classNames(
        "group/project-item relative aspect-square",
        /**
         * Should use FadeIn component, but component is not a li
         */
        fadeInAnimationClassname
      )}
      // Can't use dynamic classes with TW, so adding animationDelay through style prop
      style={{ animationDelay: `${800 + 100 * index}ms` }}
    >
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
