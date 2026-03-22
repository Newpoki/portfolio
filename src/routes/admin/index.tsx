import { createFileRoute } from "@tanstack/react-router";
import { AdminSectionCard } from "@/admin/admin-section-card";
import { m } from "@/i18n/paraglide/messages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/")({
  component: Admin,
  head: () => ({
    meta: seo({
      title: m.admin_metadata_title(),
    }),
  }),
});

function Admin() {
  return (
    <div className="flex flex-col gap-10">
      <h1>{m.admin_title()}</h1>

      <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <AdminSectionCard
          title={m.admin_cards_experiencies_title()}
          content={m.admin_cards_experiencies_content()}
          linkProps={{
            children: m.admin_cards_experiencies_link(),
            to: "/admin/experiencies",
          }}
        />

        <AdminSectionCard
          title={m.admin_cards_projects_title()}
          content={m.admin_cards_projects_content()}
          linkProps={{
            children: m.admin_cards_projects_link(),
            to: "/admin/projects",
          }}
        />
      </ul>
    </div>
  );
}
