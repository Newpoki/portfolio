import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { m } from "@/paraglide/messages";
import { AdminProjectsTableRow } from "@/admin/projects/admin-projects-table-row";
import { projectsQueryOptions } from "@/routes/api/projects";

export const Route = createFileRoute("/admin/projects/")({
  component: AdminProjects,

  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(projectsQueryOptions);
  },
});

function AdminProjects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {m.admin_projects_title()}

        <Button type="button">
          <Link to="/admin/projects/new">{m.admin_projects_add_project()}</Link>
        </Button>
      </h1>

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25 min-w-10 sm:w-50">
              {m.admin_projects_table_name()}
            </TableHead>
            <TableHead className="w-full">
              {m.admin_projects_table_short_desc()}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <AdminProjectsTableRow key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
