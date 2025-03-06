import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const createExperienceSchema = z.object({
  title: z.string().min(1),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().nullable(),
  content_fr: z.string().min(1),
  content_en: z.string().min(1),
  place: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
  }),
});

const editExperienceSchema = createExperienceSchema.extend({
  id: z.string(),
});

export async function POST(request: NextRequest) {
  const { formValues } = await request.json();

  const parsedResult = createExperienceSchema.safeParse(formValues);

  // TODO: It could be cool to return the validation error to map with front end fields
  // But not really important as this is only an admin panel for me
  if (!parsedResult.success) {
    return new Response("An error occured", {
      status: 400,
    });
  }

  await prisma.experience.create({
    data: {
      ...parsedResult.data,
      id: undefined,
    },
  });

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}

export async function PUT(request: NextRequest) {
  const { formValues } = await request.json();

  const parsedResult = editExperienceSchema.safeParse(formValues);

  // TODO: It could be cool to return the validation error to map with front end fields
  // But not really important as this is only an admin panel for me
  if (!parsedResult.success) {
    return new Response("An error occured", {
      status: 400,
    });
  }

  const { id, ...data } = parsedResult.data;

  await prisma.experience.update({
    where: { id },
    data,
  });

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
