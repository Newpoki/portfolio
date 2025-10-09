import { PrismaClient } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { AdminProjectForm } from "../project-form/project-form";

const prisma = new PrismaClient();

const fetchProject = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (project == null) {
    throw new Error("No any project has been found");
  }

  return project;
};

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const t = await getTranslations("ADMIN.projects.edit");
  const project = await fetchProject(id);

  return (
    <div className="flex flex-col gap-8">
      <h1>{t("title")}</h1>

      <AdminProjectForm project={project} />
    </div>
  );
}
