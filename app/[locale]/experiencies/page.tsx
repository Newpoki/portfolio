import { ReactFlowProvider } from "@xyflow/react";
import { Metadata } from "next";
import { fetchExperiencies } from "./experiencies-actions";
import { ExperienciesFlowPage } from "./experiencies-flow-page";

export const metadata: Metadata = {
  title: "Jason Savelli - Experiencies",
  description: "All my previous experiencies",
};

export default async function ExperienciesPage() {
  const experiencies = await fetchExperiencies();

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-8">Experiencies</h1>

      <ReactFlowProvider>
        <ExperienciesFlowPage experiencies={experiencies} />
      </ReactFlowProvider>
    </div>
  );
}
