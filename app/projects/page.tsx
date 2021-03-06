import { Metadata } from "next";
import { Typography } from "../components/typography";
import { ProjectSummary } from "./project-summary";
import { SlideUp } from "../components/slide-up";
import { FadeIn } from "../components/fade-in";
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
      <div className="mb-8">
        <SlideUp>
          <Typography variant="h1">Projects</Typography>
        </SlideUp>
      </div>

      <FadeIn className="animation-delay-[900ms] lg:mb-8">
        <div className="mb-12 lg:max-w-screen-sm">
          <Typography variant="h2">
            Some side projects I have worked on.
          </Typography>
        </div>

        <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((project, index) => {
            return (
              <ProjectSummary
                delayFactor={index}
                project={project}
                isFavorite={project.isFavorite}
                key={project.id}
              />
            );
          })}
        </ul>
      </FadeIn>
    </section>
  );
}
