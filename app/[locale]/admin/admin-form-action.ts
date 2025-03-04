"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateExperience(formData: FormData) {
  const experience = await prisma.experience.update({
    where: {
      id: "64cf626ccb8c416781525279",
    },
    data: {
      content_fr: formData.get("content_fr") as string,
    },
  });

  return experience;
}
