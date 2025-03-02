import { TabeListItem } from "@/components/ui/table-list-item";
import { Project } from "@prisma/client";
import { getTranslations } from "next-intl/server";

type Props = {
  project: Project;
};

export const ProjectInfosList = async ({ project }: Props) => {
  const t = await getTranslations("PROJECT");

  const { bundler, language, ui, stateManagement, dataFetching } = project;

  const deployedAt = project.deployedAt.getFullYear();

  return (
    <ul>
      <TabeListItem label={t("deployed-at-title")}>
        {t("deployed-at-content", { deployedAt })}
      </TabeListItem>
      <TabeListItem label={t("bundler")}>{bundler}</TabeListItem>
      <TabeListItem label={t("language")}>{language}</TabeListItem>
      <TabeListItem label={t("ui")}>{ui}</TabeListItem>
      <TabeListItem label={t("state-management")}>
        {stateManagement}
      </TabeListItem>
      <TabeListItem label={t("data-fetching")}>{dataFetching}</TabeListItem>
    </ul>
  );
};
