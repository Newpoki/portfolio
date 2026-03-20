import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import {
  BUNDLER_OPTIONS,
  FRAMEWORK_OPTIONS,
  STATE_MANAGEMENT_OPTIONS,
  USER_INTERFACE_OPTIONS,
} from "../../project/project-constants";
import { projectQueryOptions } from "./api/projects.$slug";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@/components/ui/link";
import { m } from "@/paraglide/messages";
import { TabeListItem } from "@/components/ui/table-list-item";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectComponent,
  loader: async ({ context, params: { slug } }) => {
    await context.queryClient.ensureQueryData(projectQueryOptions({ slug }));
  },
  errorComponent: ProjectComponentError,
  //   TODO: Implement not found
  // TODO: Implement error component,
});

function ProjectComponentError({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function ProjectComponent() {
  const params = Route.useParams();

  const { data: project } = useSuspenseQuery(
    projectQueryOptions({ slug: params.slug }),
  );

  const locale = getLocale();

  return (
    <div className="flex flex-col lg:gap-8">
      <div className="flex max-h-[calc(100dvh-var(--header-h)-var(--header-m-b))] flex-col gap-8 pb-10">
        <h1 className="flex items-center justify-between">
          <span>{project.name}</span>

          <span>
            {m.project_deployed_at_content({
              deployedAt: new Date(project.deployedAt).getFullYear(),
            })}
          </span>
        </h1>

        <section className="flex min-h-full flex-col gap-10 md:gap-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="xl:max-w-4xl">{project[`shortDesc_${locale}`]}</h2>

            <span className="font-semibold whitespace-nowrap">
              {m.project_discover()}
            </span>
          </div>

          <img
            src={`/projects/${project.illustration}`}
            alt={project.illustrationAlt}
            className="relative! h-full min-h-full w-full object-contain"
          />
        </section>
      </div>

      <section className="mx-auto flex flex-col justify-center gap-16 md:w-4/5 lg:w-1/2">
        <h3 className="text-xl">{project[`description_${locale}`]}</h3>

        {project.websiteUrl && project.githubUrl && (
          <div className="sm:space-between flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              type="external"
              href={project.websiteUrl}
              animation="bright-slide"
            >
              {m.project_visit_live_version()}
            </Link>

            <Link
              type="external"
              href={project.githubUrl}
              animation="bright-slide"
            >
              {m.project_visit_github()}
            </Link>
          </div>
        )}

        <ul>
          <TabeListItem label={m.project_deployed_at_title()}>
            {m.project_deployed_at_content({ deployedAt: project.deployedAt })}
          </TabeListItem>

          <TabeListItem label={m.project_bundler()}>
            {BUNDLER_OPTIONS[project.bundler].label}
          </TabeListItem>

          <TabeListItem label={m.project_bundler()}>
            {FRAMEWORK_OPTIONS[project.framework].label}
          </TabeListItem>

          <TabeListItem label={m.project_user_interface()}>
            {USER_INTERFACE_OPTIONS[project.userInterface].label}
          </TabeListItem>

          <TabeListItem label={m.project_state_management()}>
            {STATE_MANAGEMENT_OPTIONS[project.stateManagement].label}
          </TabeListItem>
        </ul>
      </section>
    </div>
  );
}
