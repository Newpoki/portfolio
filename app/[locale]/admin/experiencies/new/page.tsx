import { ExperienceForm } from "../experience-form/experience-form";
import { getTranslations } from "next-intl/server";

export default async function NewExperiencePage() {
  const t = await getTranslations("ADMIN.experiencies.create");

  return (
    <div className="flex flex-col gap-8">
      <h1>{t("title")}</h1>

      <ExperienceForm />
    </div>
  );
}
