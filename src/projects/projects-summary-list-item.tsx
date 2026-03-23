import type { ProjectSummary } from "../routes/api/projects.summary";
import StarIcon from "@/icons/star.svg?react";
import { Link } from "@/ui/link";
import { cn } from "@/lib/cn";
import { m } from "@/i18n/paraglide/messages";

type ProjectsSummaryItemProps = {
  className?: string;
  isFavorite?: boolean | null;
  project: ProjectSummary;
  slotProps?: {
    image?: React.ImgHTMLAttributes<HTMLImageElement>;
    imageWrapper?: Partial<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >
    >;
  };
};

export const ProjectsSummaryItem = ({
  className,
  isFavorite = false,
  project,
  slotProps = {},
}: ProjectsSummaryItemProps) => {
  return (
    <article
      className={cn(
        "group/project-item aspect-unset relative aspect-square rounded-lg bg-accent p-4",
        className,
      )}
    >
      <Link
        type="internal"
        animation={null}
        to="/projects/$slug"
        params={{
          slug: project.slug,
        }}
      >
        <div
          {...slotProps.imageWrapper}
          className={cn(
            "relative aspect-square overflow-hidden",
            slotProps.imageWrapper?.className,
          )}
        >
          {isFavorite && (
            <StarIcon className="absolute top-0 left-0 z-10 aspect-square w-10 text-primary" />
          )}

          <img
            {...slotProps.image}
            src={project.illustration}
            alt={project.illustrationAlt}
            className={cn(
              "h-full w-full rounded-lg object-cover transition duration-300 group-hover/project-item:scale-110",
              slotProps.image?.className,
            )}
            sizes="(max-width: 768px) 100vw"
          />

          <div className="absolute top-2/4 left-2/4 z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 items-center rounded-full bg-background p-4 text-center shadow-xl transition-all duration-300 group-hover/project-item:scale-100">
            {m.projects_view_project()}
          </div>
        </div>
      </Link>
    </article>
  );
};
