import { ReactFlowProvider } from "@xyflow/react";
import { lazy } from "react";
import type { Experience } from "@prisma/client";

const ExperienciesFlow = lazy(() =>
  import("@/components/experiencies/experiencies-flow").then((module) => ({
    default: module.ExperienciesFlow,
  })),
);

type ExperienciesFlowPageProps = {
  experiencies: Array<Experience>;
};

export const ExperienciesFlowPage = ({
  experiencies,
}: ExperienciesFlowPageProps) => {
  return (
    <ReactFlowProvider>
      <ExperienciesFlow experiencies={experiencies} />
    </ReactFlowProvider>
  );
};
