import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { projectQueryOptions } from "@/routes/api/projects.$slug";
import { AdminProjectForm } from "@/admin/projects/form/admin-project-form";

export const Route = createFileRoute("/admin/projects/$slug")({
  component: RouteComponent,
  loader: async ({ context, params: { slug } }) => {
    await context.queryClient.ensureQueryData(projectQueryOptions({ slug }));
  },
});

function RouteComponent() {
  const params = Route.useParams();

  const { data: project } = useSuspenseQuery(
    projectQueryOptions({ slug: params.slug }),
  );

  return <AdminProjectForm project={project} />;
}
