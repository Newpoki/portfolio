import { Metadata } from "next";
import { ProjectSummary } from "./project-summary";
import { PrismaClient } from "@prisma/client";

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

  return (
    <section>
      <h1 className="mb-8">Projects</h1>

      <div className="lg:mb-8">
        <div className="mb-12">
          <h2>Some side projects I have worked on.</h2>
        </div>

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
