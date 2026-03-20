import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { experienciesQueryOptions } from "./api/experiencies";
import { m } from "@/paraglide/messages";
import { ExperienciesFlowPage } from "@/components/experiencies/experiencies-flow-page";

export const Route = createFileRoute("/experiencies")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(experienciesQueryOptions);
  },
});

function RouteComponent() {
  const { data: experiencies } = useSuspenseQuery(experienciesQueryOptions);

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-8">{m.experiencies_title()}</h1>

      <ExperienciesFlowPage experiencies={experiencies} />
    </div>
  );
}
