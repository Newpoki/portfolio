import { Editor } from "@/components/ui/editor/editor";
import { PrismaClient } from "@prisma/client";

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

  return <Editor content={experience.content_fr} immediatelyRender={false} />;
}
