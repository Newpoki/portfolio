import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { experienciesQueryOptions } from "../../api/experiencies";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { m } from "@/paraglide/messages";
import { AdminExperienciesTableRow } from "@/admin/experiencies/admin-experiencies-table-row";

export const Route = createFileRoute("/admin/experiencies/")({
  component: AdminExperiencies,

  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(experienciesQueryOptions);
  },
});

function AdminExperiencies() {
  const { data: experiencies } = useSuspenseQuery(experienciesQueryOptions);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {m.admin_experiencies_title()}

        <Button type="button">
          <Link to="/admin/experiencies/new">
            {m.admin_experiencies_add_experience()}
          </Link>
        </Button>
      </h1>

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25 min-w-10 sm:w-50">
              {m.admin_experiencies_table_title()}
            </TableHead>
            <TableHead className="w-full">
              {m.admin_experiencies_table_content()}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {experiencies.map((experience) => (
            <AdminExperienciesTableRow
              key={experience.id}
              experience={experience}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
