import { ReactFlowProvider } from "@xyflow/react";
import { Metadata } from "next";
import { fetchExperiencies } from "./experiencies-actions";
import { ExperienciesFlowPage } from "./experiencies-flow-page";
import { getTranslations } from "next-intl/server";
import { Locale } from "../i18n/routing";

export const metadata: Metadata = {
  title: "Experiencies - Jason Savelli",
  description: "All my previous experiencies",
};

type ExperienciesPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function ExperienciesPage({
  params,
}: ExperienciesPageProps) {
  const { locale } = await params;

  const experiencies = await fetchExperiencies({ locale });
  const t = await getTranslations("EXPERIENCIES");

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-8">{t("title")}</h1>

      <ReactFlowProvider>
        <ExperienciesFlowPage experiencies={experiencies} />
      </ReactFlowProvider>
    </div>
  );
}
