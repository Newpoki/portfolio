import { PrismaClient } from "@prisma/client";
import { ExperienceForm } from "../experience-form/experience-form";
import { getTranslations } from "next-intl/server";

const prisma = new PrismaClient();

const fetchExperience = async (id: string) => {
  const experience = await prisma.experience.findUnique({
    where: {
      id,
    },
  });

  if (experience == null) {
    throw new Error("No any experience has been found");
  }

  return experience;
};

type ExperiencePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { id } = await params;

  const t = await getTranslations("ADMIN.experiencies.edit");
  const experience = await fetchExperience(id);

  return (
    <div className="flex flex-col gap-8">
      <h1>{t("title")}</h1>

      <ExperienceForm experience={experience} />
    </div>
  );
}
