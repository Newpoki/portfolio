"use server";

import { PrismaClient } from "@prisma/client";
import { serialize } from "next-mdx-remote/serialize";

const prisma = new PrismaClient();

export const fetchExperiencies = async () => {
  const experiencies = await prisma.experience.findMany({
    orderBy: {
      startedAt: "desc",
    },
  });

  const serializedExperiencies = experiencies.map(async (experience) => {
    const content = await serialize(experience.content);

    return { ...experience, content };
  });

  return Promise.all(serializedExperiencies);
};

export type Experiencies = Awaited<ReturnType<typeof fetchExperiencies>>;
