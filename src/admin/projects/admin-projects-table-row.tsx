import { useNavigate } from "@tanstack/react-router";
import type { Project } from "@prisma/client";
import { getLocale } from "@/i18n/paraglide/runtime";
import { TableCell, TableRow } from "@/ui/table";

type AdminProjectsTableRowProps = {
  project: Project;
};

export const AdminProjectsTableRow = ({
  project,
}: AdminProjectsTableRowProps) => {
  const navigate = useNavigate();

  const locale = getLocale();

  const handleClick = () => {
    navigate({
      to: "/admin/projects/$slug",
      params: {
        slug: project.slug,
      },
    });
  };

  return (
    <TableRow onClick={handleClick}>
      <TableCell className="w-25 min-w-10 truncate sm:w-50">
        {project.name}
      </TableCell>

      <TableCell className="w-full truncate">
        {project[`shortDesc_${locale}`]}
      </TableCell>
    </TableRow>
  );
};
