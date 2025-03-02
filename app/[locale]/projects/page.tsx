import { Metadata } from "next";
import { ProjectSummary } from "./project-summary";
import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Jason Savelli - Projects",
  description: "My side projects",
};

const prisma = new PrismaClient();

const getProjectsSummary = async () => {
  const projectsSummary = await prisma.project.findMany({
    select: {
      slug: true,
      id: true,
      illustrationAlt: true,
      illustration: true,
      isFavorite: true,
    },
    orderBy: [
      {
        isFavorite: "desc",
      },
      {
        deployedAt: "desc",
      },
    ],
  });

  return projectsSummary;
};

export default async function Projects() {
  const data = await getProjectsSummary();
  const t = await getTranslations("PROJECTS");

  return (
    <section>
      <h1 className="mb-8">{t("title")}</h1>

      <div>
        <h2 className="mb-12">{t("subtitle")}</h2>

        <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((project) => {
            return (
              <li key={project.id}>
                <ProjectSummary
                  project={project}
                  isFavorite={project.isFavorite}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
