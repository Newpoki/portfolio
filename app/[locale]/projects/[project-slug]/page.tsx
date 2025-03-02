import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { ProjectInfosList } from "./project-infos-list";
import { Link } from "@/components/ui/link";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    "project-slug": string;
  }>;
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
  const project = await fetchProjectData((await props.params)["project-slug"]);
  const t = await getTranslations("PROJECT");

  return (
    <div>
      <h1 className="mb-8 flex items-center justify-between">
        <span>{project.name}</span>

        <span>
          {t("deployed-at-content", {
            deployedAt: project.deployedAt.getFullYear(),
          })}
        </span>
      </h1>

      <section className="relative flex flex-col lg:mb-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="md:max-w-sm">{project.shortDesc}</h2>

          <span className="font-semibold whitespace-nowrap">
            {t("discover")}
          </span>
        </div>

        <Image
          src={project.illustration}
          alt={project.illustrationAlt}
          fill
          className="relative! object-cover"
          priority
        />

        <section className="mx-auto flex flex-col justify-center gap-16 md:w-4/5 lg:w-1/2">
          <h3 className="text-xl">{project.description}</h3>

          {project.websiteUrl && project.githubUrl && (
            <div className="sm:space-between flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                type="external"
                href={project.websiteUrl}
                animation="bright-slide"
              >
                {t("visit-live-version")}
              </Link>

              <Link
                type="external"
                href={project.githubUrl}
                animation="bright-slide"
              >
                {t("visit-github")}
              </Link>
            </div>
          )}

          <ProjectInfosList project={project} />
        </section>
      </section>
    </div>
  );
}
