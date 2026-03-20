import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import {
  BUNDLER,
  FRAMEWORK,
  STATE_MANAGEMENT,
  USER_INTERFACE_LIBRARY,
} from "../../../project/project-constants";
import type { MutationOptions } from "@tanstack/react-query";
import type { Project } from "@prisma/client";

const prisma = new PrismaClient();

const createProjectPayloadSchema = z.object({
  isFavorite: z.boolean(),
  name: z.string().min(1),
  // This could accept way more, but I want to ensure to keep them all the same format
  illustration: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*\.png$/, {
    message: "Filename must be lower case, with png extension",
  }),
  illustrationAlt: z.string().min(1),
  shortDesc_fr: z.string().min(1),
  shortDesc_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  deployedAt: z.string().datetime(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase and hyphen-separated",
  }),
  websiteUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  bundler: z.enum(BUNDLER),
  framework: z.enum(FRAMEWORK),
  userInterface: z.enum(USER_INTERFACE_LIBRARY),
  stateManagement: z.enum(STATE_MANAGEMENT),
});

export const Route = createFileRoute("/api/projects")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info(`Fetching projects`, request.url);
        try {
          const projects = await prisma.project.findMany({
            orderBy: [{ isFavorite: "desc" }, { deployedAt: "desc" }],
          });

          return Response.json(projects);
        } catch (e) {
          console.error(e);
          return Response.json({ error: "User not found" }, { status: 404 });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = createProjectPayloadSchema.parse(body);

          const project = await prisma.project.create({
            data: parsed,
          });

          return Response.json(project, { status: 201 });
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Failed to create project" },
            { status: 400 },
          );
        }
      },
    },
  },
});

export const projectsQueryOptions = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    const { data } = await axios.get<Array<Project>>(
      `${import.meta.env.VITE_BASE_URL}/api/projects`,
    );

    return data;
  },
});

type CreateProjectPayload = z.infer<typeof createProjectPayloadSchema>;

export const createProjectMutationOptions: MutationOptions<
  Project,
  Error,
  CreateProjectPayload
> = {
  mutationFn: async (values) => {
    const { data } = await axios.post<Project>(
      `${import.meta.env.VITE_BASE_URL}/api/projects/`,
      values,
    );
    return data;
  },
};
