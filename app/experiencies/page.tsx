import { Typography } from "../components/typography";
import { ExperienciesFlow } from "./experiencies-flow";
import { ReactFlowProvider } from "@xyflow/react";
import { Metadata } from "next";
import { fetchExperiencies } from "./experiencies-actions";

export const metadata: Metadata = {
  title: "Jason Savelli - Experiencies",
  description: "All my previous experiencies",
};

export default async function ExperienciesPage() {
  const experiencies = await fetchExperiencies();

  return (
    <div className="flex flex-1 flex-col">
      <Typography className="mb-8" variant="h1">
        Experiencies
      </Typography>

      <ReactFlowProvider>
        <ExperienciesFlow experiencies={experiencies} />
      </ReactFlowProvider>
    </div>
  );
}
