import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { ProjectInfosList } from "./project-infos-list";
import { Link } from "@/components/ui/link";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../i18n/routing";
import { Metadata } from "next";
import { generateMetadata as generateLayoutMetaData } from "@/app/[locale]/layout";

type Props = {
  params: Promise<{
    "project-slug": string;
    locale: Locale;
  }>;
};

const prisma = new PrismaClient();

const fetchProjectData = async (projectSlug: string, locale: Locale) => {
  const project = await prisma.project.findUnique({
    where: {
      slug: projectSlug,
    },
  });

  if (project == null) {
    throw new Error(`${projectSlug} has not been found`);
  }

  return {
    ...project,
    shortDesc: project[`shortDesc_${locale}`],
    description: project[`description_${locale}`],
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "project-slug": projectSlug, locale } = await params;

  // As we're overiding the open graph tags, we have to import base layout metadata
  // because next doesn't deep merge it
  const baseMetadata = await generateLayoutMetaData();

  const project = await fetchProjectData(projectSlug, locale);

  const title = project.name;
  const description = project[`shortDesc_${locale}`];

  return {
    title,
    description,

    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default async function Project({ params }: Props) {
  const { "project-slug": projectSlug, locale } = await params;

  const project = await fetchProjectData(projectSlug, locale);
  const t = await getTranslations("PROJECT");

  return (
    <div className="flex flex-col lg:gap-8">
      <div className="flex max-h-[calc(100dvh-var(--header-h)-var(--header-m-b))] flex-col gap-8 pb-10">
        <h1 className="flex items-center justify-between">
          <span>{project.name}</span>

          <span>
            {t("deployed-at-content", {
              deployedAt: project.deployedAt.getFullYear(),
            })}
          </span>
        </h1>

        <section className="flex min-h-full flex-col gap-10 md:gap-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="xl:max-w-4xl">{project.shortDesc}</h2>

            <span className="font-semibold whitespace-nowrap">
              {t("discover")}
            </span>
          </div>

          <Image
            src={project.illustration}
            alt={project.illustrationAlt}
            fill
            className="relative! min-h-full object-contain"
            priority
          />
        </section>
      </div>

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
    </div>
  );
}
