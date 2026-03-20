import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import type { MutationOptions } from "@tanstack/react-query";
import type { Experience } from "@prisma/client";
import { adminExperienceFormSchema } from "@/admin/experiencies/form/admin-experience-form-types";
import { emptyEditorRuleSchema } from "@/components/ui/editor/editor";

const prisma = new PrismaClient();

export const Route = createFileRoute("/api/experiencies")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info(`Fetching experiencies`, request.url);
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
          const parsed = adminExperienceFormSchema.parse(body);

          const experience = await prisma.experience.create({
            data: {
              title: parsed.title,
              startedAt: new Date(parsed.startedAt),
              endedAt: parsed.endedAt ? new Date(parsed.endedAt) : null,
              content_fr: parsed.content_fr,
              content_en: parsed.content_en,
              place: parsed.place,
              hidden: false,
            },
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
    const { data } = await axios.get<Array<Experience>>(
      `${import.meta.env.VITE_BASE_URL}/api/experiencies`,
    );

    return data;
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

type CreateExperiencePayload = z.infer<typeof createExperiencePayloadSchema>;

export const createExperienceMutationOptions: MutationOptions<
  Experience,
  Error,
  CreateExperiencePayload
> = {
  mutationFn: async (values) => {
    const { data } = await axios.post<Experience>(
      `${import.meta.env.VITE_BASE_URL}/api/experiencies/`,
      values,
    );
    return data;
  },
};
