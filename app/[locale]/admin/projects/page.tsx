import { getTranslations } from "next-intl/server";
import { Locale } from "../../i18n/routing";
import { Button } from "@/components/ui/button";
import { Link } from "../../i18n/navigation";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchProjects } from "../../projects/projects-actions";
import { AdminProjectsTableRow } from "./admin-projects-table-row";

type AdminProjectsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminProjectsPage({
  params,
}: AdminProjectsPageProps) {
  const { locale } = await params;

  const t = await getTranslations("ADMIN.projects");
  const projects = await fetchProjects();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {t("title")}

        <Button type="button">
          <Link href={{ pathname: "/admin/projects/new" }}>
            {t("add-project")}
          </Link>
        </Button>
      </h1>

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] min-w-10 sm:w-[200px]">
              {t("table.name")}
            </TableHead>
            <TableHead className="w-full">{t("table.short-desc")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project) => (
            <AdminProjectsTableRow
              key={project.id}
              project={project}
              locale={locale}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
