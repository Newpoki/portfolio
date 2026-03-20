import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
import { AdminProjectForm } from "@/admin/projects/form/admin-project-form";

export const Route = createFileRoute("/admin/projects/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-8">
      <h1>{m.admin_projects_create_title()}</h1>

      <AdminProjectForm />
    </div>
  );
}
