import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { projectsSummaryQueryOptions } from "../api/projects.summary";
import { m } from "@/paraglide/messages";
import { ProjectsSummaryItem } from "@/projects/projects-summary-list-item";

export const Route = createFileRoute("/projects/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(projectsSummaryQueryOptions);
  },
  onError: (error) => console.log(error),
});

function RouteComponent() {
  const { data: projectsSummary } = useSuspenseQuery(
    projectsSummaryQueryOptions,
  );

  return (
    <section>
      <h1 className="mb-8">{m.projects_title()}</h1>

      <div>
        <h2 className="mb-12">{m.projects_subtitle()}</h2>

        <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {projectsSummary.map((project) => {
            return (
              <li key={project.id}>
                <ProjectsSummaryItem
                  project={project}
                  isFavorite={project.isFavorite}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
