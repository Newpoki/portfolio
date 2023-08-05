import { Project } from "@prisma/client";
import { ProjectInfosListItem } from "./project-infos-list-item";

type Props = {
  project: Project;
};

export const ProjectInfosList = ({ project }: Props) => {
  const { bundler, language, ui, stateManagement, dataFetching } = project;

  const deployedAt = project.deployedAt.getFullYear();

  return (
    <ul>
      <ProjectInfosListItem label="Release date">
        ({deployedAt})
      </ProjectInfosListItem>
      <ProjectInfosListItem label="Bundler">{bundler}</ProjectInfosListItem>
      <ProjectInfosListItem label="Language">{language}</ProjectInfosListItem>
      <ProjectInfosListItem label="UI">{ui}</ProjectInfosListItem>
      <ProjectInfosListItem label="State management">
        {stateManagement}
      </ProjectInfosListItem>
      <ProjectInfosListItem label="Data fetching">
        {dataFetching}
      </ProjectInfosListItem>
    </ul>
  );
};
