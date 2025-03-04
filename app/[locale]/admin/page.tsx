import { PrismaClient } from "@prisma/client";
import { AdminForm } from "./admin-form";

const prisma = new PrismaClient();

const fetchExperienceData = async (experienceId: string) => {
  const experience = await prisma.experience.findUnique({
    where: {
      id: "64cf626ccb8c416781525279",
    },
  });

  if (experience == null) {
    throw new Error(`${experienceId} has not been found`);
  }

  return experience;
};

export default async function AdminPage() {
  const experience = await fetchExperienceData("64cf626ccb8c416781525279");

  return <AdminForm content={experience.content_fr} />;
}
