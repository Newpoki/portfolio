import { Background, ReactFlow, ReactFlowProvider } from "@xyflow/react";
import { m } from "@/i18n/paraglide/messages";
import "@xyflow/react/dist/style.css";

export const ExperienciesPending = () => {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mb-8">{m.experiencies_title()}</h1>

      <div className="absolute top-0 left-0 h-dvh w-dvw">
        <ReactFlowProvider>
          <ReactFlow className="flex-1">
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};
