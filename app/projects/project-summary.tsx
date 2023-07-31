import Image from "next/image";
import classNames from "classnames";
import { FadeIn } from "../components/fade-in";
import { InternalLink } from "../components/internal-link";
import { IProjectSummary } from "./types";

type Props = {
  index: number;
  project: IProjectSummary;
};

export const ProjectSummary = ({ index, project }: Props) => {
  return (
    <FadeIn
      className={classNames("group/project-item relative aspect-square")}
      as="li"
      // Can't use dynamic classes with TW, so adding animationDelay through style prop
      style={{ animationDelay: `${800 + 100 * index}ms` }}
    >
      <InternalLink href={`/projects/${project.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={project.illustration}
            alt={project.illustrationAlt}
            fill
            className="!relative object-cover transition duration-300 group-hover/project-item:scale-110"
            sizes="(max-width: 768px) 100vw"
          />

          <div className="absolute left-2/4 top-2/4 z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 items-center rounded-full bg-white p-4 text-center shadow-xl transition-all duration-300 group-hover/project-item:scale-100">
            View project
          </div>
        </div>
      </InternalLink>
    </FadeIn>
  );
};
