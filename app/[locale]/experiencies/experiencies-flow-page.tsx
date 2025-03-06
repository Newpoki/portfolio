"use client";

import { ReactFlowProvider } from "@xyflow/react";
import dynamic from "next/dynamic";
import { Experiencies } from "./experiencies-actions";
import { Locale } from "../i18n/routing";

// Next JS still renders on the server, so we must ensure its ONLY on client
const DynamicExperienciesFlow = dynamic(() => import("./experiencies-flow"), {
  loading: () => <>{null}</>,
  ssr: false,
});

type ExperienciesFlowPageProps = {
  experiencies: Experiencies;
  locale: Locale;
};

export const ExperienciesFlowPage = ({
  experiencies,
  locale,
}: ExperienciesFlowPageProps) => {
  return (
    <ReactFlowProvider>
      <DynamicExperienciesFlow experiencies={experiencies} locale={locale} />
    </ReactFlowProvider>
  );
};
