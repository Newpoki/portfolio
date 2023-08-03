import { Metadata } from "next";
import { Typography } from "../components/typography";
import { IProjectSummary } from "./types";
import { ProjectSummary } from "./project-summary";
import { SlideUp } from "../components/slide-up";
import { FadeIn } from "../components/fade-in";
import { PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Jason Savelli - Projects",
  description: "My side projects",
};

const prisma = new PrismaClient();

export const getProjectsSummary = async () => {
  const projectsSummary = await prisma.project.findMany({
    select: {
      description: true,
      slug: true,
      id: true,
      illustrationAlt: true,
      illustration: true,
    },
  });

  return projectsSummary;
};

export default async function Projects() {
  const data = await getProjectsSummary();

  return (
    <div>
      <div className="mb-8">
        <SlideUp>
          <Typography variant="h1">Projects</Typography>
        </SlideUp>
      </div>

      <FadeIn className="animation-delay-[900ms] lg:mb-8">
        <div className="mb-4 lg:max-w-screen-sm">
          <Typography variant="h2">
            Some side projects I have worked on.
          </Typography>
        </div>

        <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((project, index) => {
            return (
              <ProjectSummary
                index={index}
                project={project}
                key={project.id}
              />
            );
          })}
        </ul>
      </FadeIn>
    </div>
  );
}
