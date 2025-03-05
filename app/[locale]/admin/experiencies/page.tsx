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
      <h1>{t("title")}</h1>

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
