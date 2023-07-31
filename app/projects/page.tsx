import { Metadata } from "next";
import { Typography } from "../components/typography";
import { IProjectSummary } from "./types";
import { ProjectItem } from "./project-item";
import { SlideUp } from "../components/slide-up";
import { FadeIn } from "../components/fade-in";

export const metadata: Metadata = {
  title: "Jason Savelli - Projects",
  description: "My side projects",
};

export const getProjectsSummary = () => {
  return new Promise<IProjectSummary[]>((resolve) => {
    resolve([
      {
        id: 1,
        title: "Pokedex",
        description:
          "Based on a Figma project and an open API, I've built a minimalist pokedex",
        githubUrl: "https://github.com/Newpoki/pokedex",
        websiteUrl: "https://pokedex-newpoki.vercel.app/",
        illustration: "/projects/pokedex.png",
        alt: "Screenshot from the Pokedex project",
        deployedYear: "2022",
      },
      {
        id: 2,
        title: "Consumption calculator",
        description:
          "A really simple (and old) tool to get a car fuel consumption per 100km and get a journey cost",
        githubUrl: "https://github.com/Newpoki/calcul-conso",
        websiteUrl: "https://brave-snyder-8bb959.netlify.app/",
        illustration: "/projects/consumption-calculator.png",
        alt: "Screenshot from the consumption calculator project",
        deployedYear: "2018",
      },
    ]);
  });
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
        <div className="mb-4">
          <Typography variant="h2">
            Some side projects I have worked on.
          </Typography>
        </div>

        <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((project, index) => {
            return (
              <ProjectItem index={index} project={project} key={project.id} />
            );
          })}
        </ul>
      </FadeIn>
    </div>
  );
}
