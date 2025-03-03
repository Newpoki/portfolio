"use server";

import { PrismaClient } from "@prisma/client";
import { serialize } from "next-mdx-remote/serialize";
import { Locale } from "../i18n/routing";

const prisma = new PrismaClient();

type FetchExperienciesParams = {
  locale: Locale;
};

export const fetchExperiencies = async ({
  locale,
}: FetchExperienciesParams) => {
  const experiencies = await prisma.experience.findMany({
    where: {
      // TODO: Delete me, temp while working on admin panel
      hidden: { isSet: false },
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  const serializedExperiencies = experiencies.map(async (experience) => {
    const content = await serialize(experience[`content_${locale}`]);

    return { ...experience, content };
  });

  return Promise.all(serializedExperiencies);
};

export type Experiencies = Awaited<ReturnType<typeof fetchExperiencies>>;
