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
import type { Project } from "@prisma/client";
import type { MutationOptions } from "@tanstack/react-query";

const prisma = new PrismaClient();

const updateProjectPayloadSchema = z.object({
  id: z.string(),
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteProjectPayloadSchema = z.object({
  id: z.string(),
});

type UpdateProjectPayload = z.infer<typeof updateProjectPayloadSchema>;
type DeleteProjectPayload = z.infer<typeof deleteProjectPayloadSchema>;

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
      PUT: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = updateProjectPayloadSchema.parse(body);

          const { id, ...data } = parsed;

          const response = await prisma.project.update({
            where: { id },
            data,
          });

          return Response.json(response);
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Failed to update project" },
            { status: 400 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          await prisma.project.delete({ where: { id: params.slug } });

          // Should be using status 204, but it keep throwing errors
          return Response.json(null, { status: 200 });
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Failed to update project" },
            { status: 400 },
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

export const updateProjectMutationOptions: MutationOptions<
  Project,
  Error,
  UpdateProjectPayload
> = {
  mutationFn: async (payload) => {
    const { data } = await axios.put<Project>(
      `${import.meta.env.VITE_BASE_URL}/api/projects/${payload.id}`,
      payload,
    );
    return data;
  },
};

export const deleteProjectMutationOptions: MutationOptions<
  void,
  Error,
  DeleteProjectPayload
> = {
  mutationFn: async (payload) => {
    const { data } = await axios.delete<void>(
      `${import.meta.env.VITE_BASE_URL}/api/projects/${payload.id}`,
    );

    return data;
  },
};
