import { AdminCreationCard } from "./admin-creation-card";
import { getTranslations } from "next-intl/server";

export default async function AdminPage() {
  const t = await getTranslations("ADMIN");

  return (
    <div className="flex flex-col gap-10">
      <h1>{t("title")}</h1>

      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4">
        <li>
          <AdminCreationCard
            title={t("cards.experiencies.title")}
            content={t("cards.experiencies.content")}
            linkProps={{
              children: t("cards.experiencies.link"),
              href: {
                pathname: "/admin/experiencies/new",
              },
            }}
          />
        </li>
      </ul>
    </div>
  );
}
