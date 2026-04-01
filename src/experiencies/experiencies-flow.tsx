import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useRef } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { ExperienceNode } from "./experience-node";
import type { Edge, Node, NodeTypes, OnInit } from "@xyflow/react";
import type { ExperienceNodeData } from "./experience-node";
import type { Experience } from "@prisma/client";
import type { Locale } from "@/i18n/paraglide/runtime";
import { getLocale } from "@/i18n/paraglide/runtime";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  experienceNode: ExperienceNode,
} satisfies NodeTypes;

const shouldBeConsideredAsMobile = createIsomorphicFn()
  .client(() => {
    return window.innerWidth < 968;
  })
  .server(() => false);

const centerOnFirstElement: OnInit<Node, Edge> = async ({
  getNodes,
  fitView,
}) => {
  const isMobile = shouldBeConsideredAsMobile();

  const nodes = getNodes();

  const firstNode = nodes[0];
  const secondNode = nodes[0];

  if (firstNode == null || secondNode == null || firstNode.measured == null) {
    return;
  }

  const nodesToFitInView = isMobile ? [firstNode] : [firstNode, secondNode];

  await fitView({
    nodes: nodesToFitInView,
    duration: 250,
    padding: isMobile ? 0.8 : 0.8,
  });
};

const generateNodes = (
  experiencies: Array<Experience>,
  locale: Locale,
): Array<Node> => {
  const nodes = experiencies.map((experience, index) => {
    const isMobile = shouldBeConsideredAsMobile();

    const spaceBetweenNodes = (isMobile ? 100 : 500) * index;
    const nodeWidth = 600;

    const x = index === 0 ? 0 : index * nodeWidth + spaceBetweenNodes;

    return {
      id: experience.id,
      data: {
        experience,
        locale,
        hasLeftHandle: index !== 0,
        hasRightHandle: index !== experiencies.length - 1,
      },
      position: { x, y: 0 },
      type: "experienceNode",
      draggable: !isMobile,
      origin: [0.5, 0],
      width: nodeWidth,
    } satisfies ExperienceNodeData;
  });

  return nodes;
};

const generateEdges = (nodes: Array<Node>): Array<Edge> => {
  // Removing last element since we don't want it to have an edge
  return nodes
    .slice(0, -1)
    .map((node, index) => {
      const nextNode = nodes[index + 1];

      // Shouldn't happen as we must have at least 1 element at this point, but better be safe
      if (nextNode == null) return;

      return {
        id: `edge-${node.id}`,
        source: node.id,
        target: nextNode.id,
        type: "straight",
        animated: true,
      };
    })
    .filter(Boolean);
};

type ExperienciesFlowProps = {
  experiencies: Array<Experience>;
};

export const ExperienciesFlow = ({ experiencies }: ExperienciesFlowProps) => {
  const locale = getLocale();

  const [nodes, , onNodesChange] = useNodesState(
    generateNodes(experiencies, locale),
  );
  const [edges, , onEdgesChange] = useEdgesState(generateEdges(nodes));
  const instance = useReactFlow();

  const ref = useRef<HTMLDivElement>(null);

  const handleCenterOnFirstElement = useCallback(() => {
    centerOnFirstElement(instance);
  }, [instance]);

  const handleNodeClick = useCallback(
    async (_event: React.MouseEvent<Element>, node: Node) => {
      await instance.fitView({ nodes: [node], duration: 250, padding: 2 });
    },
    [instance],
  );

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      entries.forEach(() => {
        handleCenterOnFirstElement();
      });
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [handleCenterOnFirstElement, instance]);

  return (
    <div className="absolute top-0 left-0 h-dvh w-dvw" ref={ref}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        className="flex-1"
        nodeTypes={nodeTypes}
        onInit={centerOnFirstElement}
        onNodeClick={handleNodeClick}
      >
        <Background />
        <Controls onFitView={handleCenterOnFirstElement} />
      </ReactFlow>
    </div>
  );
};
