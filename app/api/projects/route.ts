import {
  Bundler,
  Framework,
  PrismaClient,
  UserInterfaceLibrary,
} from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const createProjectSchema = z.object({
  id: z.string().nullable(),
  name: z.string().min(1),
  illustration: z.string().min(1),
  illustrationAlt: z.string().min(1),
  shortDesc_fr: z.string().min(1),
  shortDesc_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  deployedAt: z.string().datetime(),
  slug: z.string().min(1),
  websiteUrl: z.string().url(),
  githubUrl: z.string().url(),
  bundler: z.nativeEnum(Bundler),
  framework: z.nativeEnum(Framework),
  userInterface: z.nativeEnum(UserInterfaceLibrary),
});

const editProjectSchema = createProjectSchema.extend({
  id: z.string(),
});

export async function POST(request: NextRequest) {
  const { formValues } = await request.json();

  const parsedResult = createProjectSchema.safeParse(formValues);

  console.log({ parsedResult });

  // TODO: It could be cool to return the validation error to map with front end fields
  // But not really important as this is only an admin panel for me
  if (!parsedResult.success) {
    return new Response("An error occured", {
      status: 400,
    });
  }

  await prisma.project.create({
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

  const parsedResult = editProjectSchema.safeParse(formValues);

  // TODO: It could be cool to return the validation error to map with front end fields
  // But not really important as this is only an admin panel for me
  if (!parsedResult.success) {
    return new Response("An error occured", {
      status: 400,
    });
  }

  const { id, ...data } = parsedResult.data;

  await prisma.project.update({
    where: { id },
    data,
  });

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
