"use client";

import {
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  OnInit,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ExperienceNode, type ExperienceNodeData } from "./experience-node";
import { Experiencies } from "./experiencies-actions";
import { useCallback, useEffect, useRef } from "react";

const nodeTypes = {
  experienceNode: ExperienceNode,
} satisfies NodeTypes;

type ExperienciesFlowProps = {
  experiencies: Experiencies;
};

const shouldBeConsideredAsMobile = () => window.innerWidth < 968;

const centerOnFirstElement: OnInit<Node, Edge> = ({ getNodes, fitView }) => {
  const isMobile = shouldBeConsideredAsMobile();

  const nodes = getNodes();

  const firstNode = nodes[0];

  if (firstNode == null || firstNode.measured == null) {
    return;
  }

  const nodesToFitInView = isMobile ? [firstNode] : [firstNode, nodes[1]];

  fitView({
    nodes: nodesToFitInView,
    duration: 250,
    padding: isMobile ? 0.8 : 0.3,
  });
};

const generateNodes = (experiencies: Experiencies): Node[] => {
  const nodes = experiencies.map((experience, index) => {
    const isMobile = shouldBeConsideredAsMobile();

    const spaceBetweenNodes = (isMobile ? 100 : 500) * index;
    const nodeWidth = 600;

    const x = index === 0 ? 0 : index * nodeWidth + spaceBetweenNodes;

    return {
      id: experience.id,
      data: {
        content: experience.content,
        experience,
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

const generateEdges = (nodes: Node[]): Edge[] => {
  // Removing last element since we don't want it to have an edge
  return nodes.slice(0, -1).map((node, index) => ({
    id: `edge-${node.id}`,
    source: node.id,
    target: nodes[index + 1].id,
    type: "straight",
    animated: true,
  }));
};

export default function ExperienciesFlow({
  experiencies,
}: ExperienciesFlowProps) {
  const [nodes, , onNodesChange] = useNodesState(generateNodes(experiencies));
  const [edges, , onEdgesChange] = useEdgesState(generateEdges(nodes));
  const instance = useReactFlow();

  const ref = useRef<HTMLDivElement>(null);

  const handleCenterOnFirstElement = useCallback(() => {
    centerOnFirstElement(instance);
  }, [instance]);

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
    <div className="absolute top-0 left-0 h-[100dvh] w-[100dvw]" ref={ref}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        className="flex-1"
        nodeTypes={nodeTypes}
        onInit={centerOnFirstElement}
      >
        <Background />
        <Controls onFitView={handleCenterOnFirstElement} />
      </ReactFlow>
    </div>
  );
}
