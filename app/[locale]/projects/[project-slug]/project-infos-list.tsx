import { TabeListItem } from "@/components/ui/table-list-item";
import { Project } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { BUNDLER_OPTIONS, FRAMEWORK_OPTIONS } from "./project-constants";

type Props = {
  project: Project;
};

export const ProjectInfosList = async ({ project }: Props) => {
  const t = await getTranslations("PROJECT");

  const { bundler, framework } = project;

  const deployedAt = project.deployedAt.getFullYear();

  return (
    <ul>
      <TabeListItem label={t("deployed-at-title")}>
        {t("deployed-at-content", { deployedAt })}
      </TabeListItem>
      <TabeListItem label={t("bundler")}>
        {BUNDLER_OPTIONS[bundler].label}
      </TabeListItem>
      <TabeListItem label={t("framework")}>
        {FRAMEWORK_OPTIONS[framework].label}
      </TabeListItem>

      {/* TODO: Add back data fetching */}
      {/* TODO: Add back state management */}
      {/* TODO: Add I18N field*/}
      {/* TODO: Remove language */}

      {/* <TabeListItem label={t("language")}>{language}</TabeListItem>
      <TabeListItem label={t("ui")}>{ui}</TabeListItem>
      <TabeListItem label={t("state-management")}>
        {stateManagement}
      </TabeListItem>
      <TabeListItem label={t("data-fetching")}>{dataFetching}</TabeListItem> */}
    </ul>
  );
};
