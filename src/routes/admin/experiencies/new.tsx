import { createFileRoute } from "@tanstack/react-router";
import { AdminExperienceForm } from "@/admin/experiencies/form/admin-experience-form";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/admin/experiencies/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-8">
      <h1>{m.admin_experiencies_create_title()}</h1>

      <AdminExperienceForm />
    </div>
  );
}
