import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../i18n/routing";
import { fetchExperiencies } from "../../experiencies/experiencies-actions";
import { AdminExperienciesTableRow } from "./admin-experiencies-table-row";
import { Button } from "@/components/ui/button";
import { Link } from "../../i18n/navigation";

type AdminExperiencePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminExperienciesPage({
  params,
}: AdminExperiencePageProps) {
  const { locale } = await params;

  const t = await getTranslations("ADMIN.experiencies");
  const experiencies = await fetchExperiencies();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {t("title")}

        <Button type="button">
          <Link href={{ pathname: "/admin/experiencies/new" }}>
            {t("add-experience")}
          </Link>
        </Button>
      </h1>

      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] min-w-10 sm:w-[200px]">
              {t("table.title")}
            </TableHead>
            <TableHead className="w-full">{t("table.content")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {experiencies.map((experience) => (
            <AdminExperienciesTableRow
              key={experience.id}
              experience={experience}
              locale={locale}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
