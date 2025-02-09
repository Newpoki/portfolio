import { Typography } from "../components/typography";
import { ReactFlowProvider } from "@xyflow/react";
import { Metadata } from "next";
import { fetchExperiencies } from "./experiencies-actions";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Jason Savelli - Experiencies",
  description: "All my previous experiencies",
};

// Next JS still renders on the server, so we must ensure its ONLY on client
const DynamicExperienciesFlow = dynamic(() => import("./experiencies-flow"), {
  loading: () => null,
  ssr: false,
});

export default async function ExperienciesPage() {
  const experiencies = await fetchExperiencies();

  return (
    <div className="flex flex-1 flex-col">
      <Typography className="mb-8" variant="h1">
        Experiencies
      </Typography>

      <ReactFlowProvider>
        <DynamicExperienciesFlow experiencies={experiencies} />
      </ReactFlowProvider>
    </div>
  );
}
