import { createFileRoute } from "@tanstack/react-router";
import { PrismaClient } from "@prisma/client";
import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import type { Experience } from "@prisma/client";
import type { MutationOptions } from "@tanstack/react-query";
import { emptyEditorRuleSchema } from "@/components/ui/editor/editor";
import { adminExperienceFormSchema } from "@/admin/experiencies/form/admin-experience-form-types";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateExperiencePayloadSchema = z.object({
  id: z.string(),
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteExperiencePayloadSchema = z.object({
  id: z.string(),
});

type UpdateExperiencePayload = z.infer<typeof updateExperiencePayloadSchema>;
type DeleteExperiencePayload = z.infer<typeof deleteExperiencePayloadSchema>;

export const Route = createFileRoute("/api/experiencies/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const experience = await prisma.experience.findUnique({
            where: { id: params.id },
          });

          if (experience == null) {
            throw new Error(`${params.id} has not been found`);
          }

          return Response.json(experience);
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: `Experience ${params.id} not found` },
            { status: 404 },
          );
        }
      },

      PUT: async ({ request, params }) => {
        try {
          const body = await request.json();
          const parsed = adminExperienceFormSchema.parse(body);

          const experience = await prisma.experience.update({
            where: { id: params.id },
            data: {
              title: parsed.title,
              startedAt: new Date(parsed.startedAt),
              endedAt: parsed.endedAt ? new Date(parsed.endedAt) : null,
              content_fr: parsed.content_fr,
              content_en: parsed.content_en,
              place: parsed.place,
            },
          });

          return Response.json(experience);
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Failed to update experience" },
            { status: 400 },
          );
        }
      },
      DELETE: async ({ params }) => {
        try {
          await prisma.experience.delete({ where: { id: params.id } });

          // Should be using status 204, but it keep throwing errors
          return Response.json(null, { status: 200 });
        } catch (e) {
          console.error(e);
          return Response.json(
            { error: "Failed to update experience" },
            { status: 400 },
          );
        }
      },
    },
  },
});

export const experienceQueryOptions = ({ id }: { id: Experience["id"] }) =>
  queryOptions({
    queryKey: ["experience", id],
    queryFn: async () => {
      const { data } = await axios.get<Experience>(
        `${import.meta.env.VITE_BASE_URL}/api/experiencies/${id}`,
      );
      return data;
    },
  });

export const updateExperienceMutationOptions: MutationOptions<
  Experience,
  Error,
  UpdateExperiencePayload
> = {
  mutationFn: async (payload) => {
    const { data } = await axios.put<Experience>(
      `${import.meta.env.VITE_BASE_URL}/api/experiencies/${payload.id}`,
      payload,
    );
    return data;
  },
};

export const deleteExperienceMutationOptions: MutationOptions<
  void,
  Error,
  DeleteExperiencePayload
> = {
  mutationFn: async (payload) => {
    const { data } = await axios.delete<void>(
      `${import.meta.env.VITE_BASE_URL}/api/experiencies/${payload.id}`,
    );

    return data;
  },
};
