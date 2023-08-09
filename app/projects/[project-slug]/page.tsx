import { Link } from "@/app/components/link";
import { FadeIn } from "@/app/components/fade-in";
import { SlideUp } from "@/app/components/slide-up";
import { Typography } from "@/app/components/typography";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { ProjectInfosList } from "./project-infos-list";
import { SlightlySlideUp } from "@/app/components/slightly-slide-up";

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
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">
          <Typography className="md:max-w-screen-sm" variant="h2">
            {project.shortDesc}
          </Typography>

          <Typography className="whitespace-nowrap font-semibold">
            Discover ↓
          </Typography>
        </div>

        <SlightlySlideUp className="relative mb-12 flex flex-1 animation-delay-[900ms]">
          <Image
            src={project.illustration}
            alt={project.illustrationAlt}
            fill
            className="!relative object-cover"
          />
        </SlightlySlideUp>

        <section className="mx-auto flex flex-col justify-center gap-16 md:w-4/5 lg:w-1/2">
          <Typography variant="h3" as="p" className="text-xl">
            {project.description}
          </Typography>

          {project.websiteUrl && project.githubUrl && (
            <div className="sm:space-between flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                type="external"
                href={project.websiteUrl}
                animation="bright-slide"
              >
                Visit the website&apos;s live version
              </Link>

              <Link
                type="external"
                href={project.githubUrl}
                animation="bright-slide"
              >
                Visit the website&apos;s github
              </Link>
            </div>
          )}

          <ProjectInfosList project={project} />
        </section>
      </FadeIn>
    </div>
  );
}
