import { auth } from "@/auth";
import { AdminSectionCard } from "./admin-section-card";
import { getTranslations } from "next-intl/server";
import { redirect } from "../i18n/navigation";
import { Locale } from "../i18n/routing";

type AdminPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;

  const t = await getTranslations("ADMIN");

  const session = await auth();

  // Only logged user (me) can access to admin dashboard
  if (session == null) {
    redirect({
      href: { pathname: "/signin" },
      locale,
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <h1>{t("title")}</h1>

      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <AdminSectionCard
          title={t("cards.experiencies.title")}
          content={t("cards.experiencies.content")}
          linkProps={{
            children: t("cards.experiencies.link"),
            href: {
              pathname: "/admin/experiencies",
            },
          }}
        />

        <AdminSectionCard
          title={t("cards.projects.title")}
          content={t("cards.projects.content")}
          linkProps={{
            children: t("cards.projects.link"),
            href: {
              pathname: "/admin/projects",
            },
          }}
        />
      </ul>
    </div>
  );
}
