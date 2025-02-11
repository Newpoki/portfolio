import { PrismaClient } from "@prisma/client";
import { ProjectSummary } from "../projects/project-summary";

const prisma = new PrismaClient();

const fetchLatestProject = async () => {
  const project = await prisma.project.findFirstOrThrow({
    orderBy: {
      deployedAt: "desc",
    },
    where: {
      isFavorite: true,
    },
  });

  return project;
};

export const LastProject = async () => {
  const latestProject = await fetchLatestProject();

  return (
    <article>
      <div className="mb-8 flex flex-row items-center justify-between gap-6 ">
        <h2 className="md:max-w-screen-sm">My latest project</h2>

        <span className="whitespace-nowrap font-semibold">Discover ↓</span>
      </div>

      <ProjectSummary
        className="!aspect-auto p-4 xl:p-12"
        project={latestProject}
        slotProps={{
          imageWrapper: {
            className: "!aspect-auto",
          },
          image: {
            // Have to specify !important as it already has object-cover
            className: "!object-contain",
          },
        }}
      />
    </article>
  );
};
