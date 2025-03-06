"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchExperiencies = async () => {
  const experiencies = await prisma.experience.findMany({
    where: {
      // TODO: Delete me, temp while working on admin panel
      hidden: { isSet: false },
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  return experiencies;
};

export type Experiencies = Awaited<ReturnType<typeof fetchExperiencies>>;
