import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import type { Project } from "@prisma/client";

const prisma = new PrismaClient();

export const Route = createFileRoute("/api/projects/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const project = await prisma.project.findUnique({
            where: {
              slug: params.slug,
            },
          });

          if (project == null) {
            throw new Error(`${params.slug} has not been found`);
          }

          return Response.json(project);
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: `Project ${params.slug} not found` },
            { status: 404 },
          );
        }
      },
    },
  },
});

export const projectQueryOptions = ({ slug }: { slug: Project["slug"] }) =>
  queryOptions({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data } = await axios.get<Project>(
        `${import.meta.env.VITE_BASE_URL}/api/projects/${slug}`,
      );

      return data;
    },
  });
