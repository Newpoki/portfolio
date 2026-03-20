import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import type { Project } from "@prisma/client";

const prisma = new PrismaClient();

export type ProjectSummary = Pick<
  Project,
  "slug" | "id" | "illustrationAlt" | "illustration" | "isFavorite"
>;

export const Route = createFileRoute("/api/projects/summary")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info(`Fetching projects summary`, request.url);
        try {
          const projectsSummary = (await prisma.project.findMany({
            select: {
              slug: true,
              id: true,
              illustrationAlt: true,
              illustration: true,
              isFavorite: true,
            },
            orderBy: [{ isFavorite: "desc" }, { deployedAt: "desc" }],
          })) satisfies Array<ProjectSummary>;

          return Response.json(projectsSummary);
        } catch (e) {
          console.error(e);
          return Response.json({ error: "User not found" }, { status: 404 });
        }
      },
    },
  },
});

export const projectsSummaryQueryOptions = queryOptions({
  queryKey: ["projects", "summary"],
  queryFn: async () => {
    const { data } = await axios.get<Array<ProjectSummary>>(
      `${import.meta.env.VITE_BASE_URL}/api/projects`,
    );

    return data;
  },
});
