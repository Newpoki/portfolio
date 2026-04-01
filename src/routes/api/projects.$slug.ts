import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { put } from "@vercel/blob";
import type { Project } from "@prisma/client";
import type { MutationOptions } from "@tanstack/react-query";
import {
  BUNDLER,
  FRAMEWORK,
  STATE_MANAGEMENT,
  USER_INTERFACE_LIBRARY,
} from "@/projects/project-constants";
import { fetchClient } from "@/fetch-client";
import { m } from "@/i18n/paraglide/messages";

const prisma = new PrismaClient();

const updateProjectPayloadSchema = z.object({
  id: z.string(),
  isFavorite: z.boolean(),
  name: z.string().min(1),
  illustration: z.url(),
  illustrationAlt: z.string().min(1),
  shortDesc_fr: z.string().min(1),
  shortDesc_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  deployedAt: z.iso.datetime(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: m.admin_projects_form_slug_format(),
  }),
  websiteUrl: z.literal("").or(z.url().optional()),
  githubUrl: z.literal("").or(z.url().optional()),
  bundler: z.enum(BUNDLER),
  framework: z.enum(FRAMEWORK),
  userInterface: z.enum(USER_INTERFACE_LIBRARY),
  stateManagement: z.enum(STATE_MANAGEMENT),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteProjectPayloadSchema = z.object({
  id: z.string(),
});

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
          const formData = await request.formData();

          const stringifiedFormatData = z.string().parse(formData.get("data"));
          const payload = z
            .record(z.string(), z.unknown())
            .parse(JSON.parse(stringifiedFormatData));

          const file = formData.get("illustration") as File | null;

          let illustrationUrl: string | undefined;

          if (file && file.size > 0) {
            const blob = await put(`projects/${payload.name}`, file, {
              access: "public",
              allowOverwrite: true,
            });
            illustrationUrl = blob.url;
          } else {
            const existing = await prisma.project.findUnique({
              where: { id: payload.id as string },
              select: { illustration: true },
            });
            illustrationUrl = existing?.illustration;
          }

          const parsed = updateProjectPayloadSchema.parse({
            ...payload,
            illustration: illustrationUrl,
          });

          const { id, ...data } = parsed;

          const response = await prisma.project.update({ where: { id }, data });

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
      const { data } = await fetchClient.get<Project>(`/api/projects/${slug}`);

      return data;
    },
  });

export type UpdateProjectPayload = {
  data: Omit<z.infer<typeof updateProjectPayloadSchema>, "illustration">;
  file: File | null;
};

export const updateProjectMutationOptions: MutationOptions<
  Project,
  Error,
  UpdateProjectPayload
> = {
  mutationFn: async ({ data, file }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (file) {
      formData.append("illustration", file);
    }

    const { data: project } = await fetchClient.put<Project>(
      `/api/projects/${data.id}`,
      formData,
    );
    return project;
  },
};

export const deleteProjectMutationOptions: MutationOptions<
  void,
  Error,
  DeleteProjectPayload
> = {
  mutationFn: async (payload) => {
    const { data } = await fetchClient.delete<void>(
      `/api/projects/${payload.id}`,
    );

    return data;
  },
};
