import { TabeListItem } from "@/components/ui/table-list-item";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "References",
  description: "Some references",
};

export default async function References() {
  const t = await getTranslations("REFERENCES");

  return (
    <div>
      <h1 className="mb-8">{t("title")}</h1>

      <section>
        <h2 className="mb-12">{t("subtitle")}</h2>

        <div className="lg:1/2 mx-auto flex flex-col gap-8 md:w-2/3">
          <p>{t("description")}</p>
          <p>{t("privacy")}</p>

          <ul>
            <TabeListItem label="Damien Souquieres">
              {t("director-of-engineering")}
            </TabeListItem>

            <TabeListItem label="Michaël Haberzettel">
              {t("front-end-architect")}
            </TabeListItem>

            <TabeListItem label="Lorenzo Gentilli">
              {t("product-manager")}
            </TabeListItem>
          </ul>
        </div>
      </section>
    </div>
  );
}
