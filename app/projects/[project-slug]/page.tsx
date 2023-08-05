import { ExternalLink } from "@/app/components/external-link";
import { FadeIn } from "@/app/components/fade-in";
import { SlideUp } from "@/app/components/slide-up";
import { Typography } from "@/app/components/typography";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { ProjectInfosList } from "./project-infos-list";

type Props = {
  params: {
    "project-slug": string;
  };
};

const prisma = new PrismaClient();

const fetchProjectData = async (projectSlug: string) => {
  const project = await prisma.project.findUnique({
    where: {
      slug: projectSlug,
    },
  });

  if (project == null) {
    throw new Error(`${projectSlug} has not been found`);
  }

  return project;
};

export default async function ProjectSlug(props: Props) {
  const project = await fetchProjectData(props.params["project-slug"]);

  return (
    <div>
      <div className="mb-8">
        <SlideUp>
          <Typography
            className="flex items-center justify-between"
            variant="h1"
          >
            <span>{project.name}</span>
            <span>({project.deployedAt.getFullYear()})</span>
          </Typography>
        </SlideUp>
      </div>

      <FadeIn className="flex flex-col animation-delay-[900ms] lg:mb-8">
        <div className="mb-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">
          <Typography className="md:max-w-screen-sm" variant="h2">
            {project.shortDesc}
          </Typography>

          <Typography className="whitespace-nowrap font-semibold">
            Discover ↓
          </Typography>
        </div>

        <div className="relative mb-12 flex flex-1">
          <Image
            src={project.illustration}
            alt={project.illustrationAlt}
            fill
            className="!relative object-cover"
          />
        </div>

        <section className="mx-auto flex flex-col justify-center gap-16 md:w-4/5 lg:w-1/2">
          <Typography variant="h2" as="p" className="text-xl">
            {project.description}
          </Typography>

          <div className="sm:space-between flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ExternalLink href={project.websiteUrl}>
              Visit the website&apos;s live version
            </ExternalLink>

            <ExternalLink href={project.githubUrl}>
              Visit the website&apos;s github
            </ExternalLink>
          </div>

          <ProjectInfosList project={project} />
        </section>
      </FadeIn>
    </div>
  );
}
