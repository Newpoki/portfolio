"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchProjects = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      deployedAt: "desc",
    },
  });

  return projects;
};

export type Projects = Awaited<ReturnType<typeof fetchProjects>>;
