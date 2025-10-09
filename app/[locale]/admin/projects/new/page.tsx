import { AdminProjectForm } from "../project-form/project-form";
import { getTranslations } from "next-intl/server";

export default async function NewProjectPage() {
  const t = await getTranslations("ADMIN.projects.create");

  return (
    <div className="flex flex-col gap-8">
      <h1>{t("title")}</h1>

      <AdminProjectForm />
    </div>
  );
}
