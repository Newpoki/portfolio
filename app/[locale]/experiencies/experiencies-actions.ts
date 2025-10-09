"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchExperiencies = async () => {
  const experiencies = await prisma.experience.findMany({
    orderBy: {
      startedAt: "desc",
    },
  });

  return experiencies;
};

export type Experiencies = Awaited<ReturnType<typeof fetchExperiencies>>;
