import { TabeListItem } from "@/components/ui/table-list-item";
import { Project } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import {
  BUNDLER_OPTIONS,
  FRAMEWORK_OPTIONS,
  STATE_MANAGEMENT_OPTIONS,
  USER_INTERFACE_OPTIONS,
} from "./project-constants";

type Props = {
  project: Project;
};

export const ProjectInfosList = async ({ project }: Props) => {
  const t = await getTranslations("PROJECT");

  const { bundler, framework, userInterface, stateManagement } = project;

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

      <TabeListItem label={t("user-interface")}>
        {USER_INTERFACE_OPTIONS[userInterface].label}
      </TabeListItem>

      <TabeListItem label={t("state-management")}>
        {STATE_MANAGEMENT_OPTIONS[stateManagement].label}
      </TabeListItem>
    </ul>
  );
};
