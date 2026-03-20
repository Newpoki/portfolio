import type { ProjectSummary as IProjectSummary } from "../api/projects";
import StarIcon from "@/icons/star.svg?react";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";
import { m } from "@/paraglide/messages";

type Props = {
  className?: string;
  isFavorite?: boolean | null;
  project: IProjectSummary;
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

// TODO: Try to improve routes archi for projects
export const ProjectSummary = ({
  className,
  isFavorite = false,
  project,
  slotProps = {},
}: Props) => {
  return (
    <article
      className={cn(
        "group/project-item aspect-unset bg-accent relative aspect-square rounded-lg p-4",
        className,
      )}
    >
      <Link
        type="internal"
        animation={null}
        to={`/projects/$slug`}
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
            <StarIcon className="text-primary absolute top-0 left-0 z-10 aspect-square w-10" />
          )}

          <img
            {...slotProps.image}
            src={`/projects/${project.illustration}`}
            alt={project.illustrationAlt}
            className={cn(
              "relative! h-full w-full rounded-lg object-cover transition duration-300 group-hover/project-item:scale-110",
              slotProps.image?.className,
            )}
            sizes="(max-width: 768px) 100vw"
          />

          <div className="bg-background absolute top-2/4 left-2/4 z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 scale-0 items-center rounded-full p-4 text-center shadow-xl transition-all duration-300 group-hover/project-item:scale-100">
            {m.projects_view_project()}
          </div>
        </div>
      </Link>
    </article>
  );
};
