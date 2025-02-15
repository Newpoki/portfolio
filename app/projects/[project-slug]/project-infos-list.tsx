import { TabeListItem } from "@/components/ui/table-list-item";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

export const ProjectInfosList = ({ project }: Props) => {
  const { bundler, language, ui, stateManagement, dataFetching } = project;

  const deployedAt = project.deployedAt.getFullYear();

  return (
    <ul>
      <TabeListItem label="Release date">({deployedAt})</TabeListItem>
      <TabeListItem label="Bundler">{bundler}</TabeListItem>
      <TabeListItem label="Language">{language}</TabeListItem>
      <TabeListItem label="UI">{ui}</TabeListItem>
      <TabeListItem label="State management">{stateManagement}</TabeListItem>
      <TabeListItem label="Data fetching">{dataFetching}</TabeListItem>
    </ul>
  );
};
