import { PrismaClient } from "@prisma/client";
import { Typography } from "../components/typography";
import { ProjectSummary } from "../projects/project-summary";

const prisma = new PrismaClient();

const fetchLatestProject = async () => {
  const project = await prisma.project.findFirstOrThrow({
    orderBy: {
      deployedAt: "desc",
    },
  });

  return project;
};

export const LastProject = async () => {
  const latestProject = await fetchLatestProject();

  return (
    <article>
      <div className="mb-8 flex flex-row items-center justify-between gap-6 ">
        <Typography className="md:max-w-screen-sm" variant="h2">
          My latest project
        </Typography>

        <Typography className="whitespace-nowrap font-semibold">
          Discover ↓
        </Typography>
      </div>

      <ProjectSummary
        as="section"
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
