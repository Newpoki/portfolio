import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import type { MutationOptions } from "@tanstack/react-query";
import type { Experience } from "@prisma/client";
import { emptyEditorRuleSchema } from "@/ui/editor/editor";
import { axiosClient } from "@/axios-client";

const prisma = new PrismaClient();

const createExperiencePayloadSchema = z.object({
  title: z.string().min(1),
  startedAt: z.iso.datetime(),
  endedAt: z.iso.datetime().nullable(),
  content_fr: emptyEditorRuleSchema,
  content_en: emptyEditorRuleSchema,
  place: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
  }),
});

export const Route = createFileRoute("/api/experiencies")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info("Fetching experiencies", request.url);
        try {
          const experiencies = await prisma.experience.findMany({
            orderBy: {
              startedAt: "desc",
            },
          });

          return Response.json(experiencies);
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Experiencies not found" },
            { status: 404 },
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = createExperiencePayloadSchema.parse(body);

          const experience = await prisma.experience.create({
            data: parsed,
          });

          return Response.json(experience, { status: 201 });
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Failed to create experience" },
            { status: 400 },
          );
        }
      },
    },
  },
});

export const experienciesQueryOptions = queryOptions({
  queryKey: ["experiencies"],
  queryFn: async () => {
    const { data } =
      await axiosClient.get<Array<Experience>>("/api/experiencies");

    return data;
  },
});

type CreateExperiencePayload = z.infer<typeof createExperiencePayloadSchema>;

export const createExperienceMutationOptions: MutationOptions<
  Experience,
  Error,
  CreateExperiencePayload
> = {
  mutationFn: async (values) => {
    const { data } = await axiosClient.post<Experience>(
      "/api/experiencies/",
      values,
    );
    return data;
  },
};
