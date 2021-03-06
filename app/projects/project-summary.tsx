import Image from "next/image";
import { FadeIn } from "../components/fade-in";
import { ProjectSummaryData } from "./types";
import { Link } from "../components/link";
import classNames from "classnames";
import React from "react";
import StarIcon from "@/public/icons/star.svg";

type Props = {
  as?: React.ElementType;
  className?: string;
  delayFactor?: number;
  isFavorite?: boolean | null;
  project: ProjectSummaryData;
  slotProps?: {
    image?: Partial<React.ComponentProps<typeof Image>>;
    imageWrapper?: Partial<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >
    >;
  };
};

export const ProjectSummary = ({
  as = "li",
  className,
  delayFactor = 0,
  isFavorite = false,
  project,
  slotProps = {},
}: Props) => {
  return (
    <FadeIn
      className={classNames(
        "group/project-item aspect-unset relative aspect-square rounded-lg bg-gray-900 p-4",
        className
      )}
      as={as}
      // Can't use dynamic classes with TW, so adding animationDelay through style prop
      style={{ animationDelay: `${800 + 100 * delayFactor}ms` }}
    >
      <Link href={`/projects/${project.slug}`} type="internal" animation={null}>
        <div
          {...slotProps.imageWrapper}
          className={classNames(
            "relative aspect-square overflow-hidden",
            slotProps.imageWrapper?.className
          )}
        >
          {isFavorite && (
            <StarIcon className="absolute left-0 top-0 z-10 aspect-square w-10 text-yellow-500" />
          )}

          <Image
            {...slotProps.image}
            src={project.illustration}
            alt={project.illustrationAlt}
            fill
            className={classNames(
              "!relative rounded-lg object-cover transition duration-300 group-hover/project-item:scale-110",
              slotProps.image?.className
            )}
            sizes="(max-width: 768px) 100vw"
          />

          <div className="absolute left-2/4 top-2/4 z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 items-center rounded-full bg-white p-4 text-center shadow-xl transition-all duration-300 group-hover/project-item:scale-100">
            View project
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};
