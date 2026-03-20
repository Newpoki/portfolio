import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AdminExperienceForm } from "@/admin/experiencies/form/admin-experience-form";
import { experienceQueryOptions } from "@/routes/api/experiencies.$id";

export const Route = createFileRoute("/admin/experiencies/$id")({
  component: RouteComponent,
  loader: async ({ context, params: { id } }) => {
    await context.queryClient.ensureQueryData(experienceQueryOptions({ id }));
  },
});

function RouteComponent() {
  const params = Route.useParams();

  const { data: experience } = useSuspenseQuery(
    experienceQueryOptions({ id: params.id }),
  );

  return <AdminExperienceForm experience={experience} />;
}
