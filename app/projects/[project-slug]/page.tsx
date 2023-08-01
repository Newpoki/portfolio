import { FadeIn } from "@/app/components/fade-in";
import { SlideUp } from "@/app/components/slide-up";
import { Typography } from "@/app/components/typography";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

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
            <span>{project.deployedAt.getFullYear()}</span>
          </Typography>
        </SlideUp>
      </div>

      <FadeIn className="flex flex-col animation-delay-[900ms] lg:mb-8">
        <div className="mb-4">
          <Typography variant="h2">{project.description}</Typography>
        </div>

        <div className="flex flex-1">
          <Image
            src={project.illustration}
            alt={project.illustrationAlt}
            fill
            className="!relative object-cover"
          />
        </div>
      </FadeIn>
    </div>
  );
}
