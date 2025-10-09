import Image from "next/image";
import { ProjectSummaryData } from "./types";
import classNames from "classnames";
import React from "react";
import StarIcon from "@/public/icons/star.svg";
import { Link } from "@/components/ui/link";
import { getTranslations } from "next-intl/server";

type Props = {
  className?: string;
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

export const ProjectSummary = async ({
  className,
  isFavorite = false,
  project,
  slotProps = {},
}: Props) => {
  const t = await getTranslations("PROJECTS");

  return (
    <article
      className={classNames(
        "group/project-item aspect-unset bg-accent relative aspect-square rounded-lg p-4",
        className,
      )}
    >
      <Link
        type="internal"
        animation={null}
        href={{
          pathname: "/projects/[project-slug]",
          params: {
            "project-slug": project.slug,
          },
        }}
      >
        <div
          {...slotProps.imageWrapper}
          className={classNames(
            "relative aspect-square overflow-hidden",
            slotProps.imageWrapper?.className,
          )}
        >
          {isFavorite && (
            <StarIcon className="text-primary absolute top-0 left-0 z-10 aspect-square w-10" />
          )}

          <Image
            {...slotProps.image}
            src={`/projects/${project.illustration}`}
            alt={project.illustrationAlt}
            fill
            className={classNames(
              "relative! rounded-lg object-cover transition duration-300 group-hover/project-item:scale-110",
              slotProps.image?.className,
            )}
            sizes="(max-width: 768px) 100vw"
          />

          <div className="bg-background absolute top-2/4 left-2/4 z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 items-center rounded-full p-4 text-center shadow-xl transition-all duration-300 group-hover/project-item:scale-100">
            {t("view-project")}
          </div>
        </div>
      </Link>
    </article>
  );
};
