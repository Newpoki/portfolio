"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Project } from "@prisma/client";
import { Locale } from "../../i18n/routing";
import { useCallback } from "react";
import { useRouter } from "../../i18n/navigation";

type AdminProjectsTableRowProps = {
  project: Project;
  locale: Locale;
};

export const AdminProjectsTableRow = ({
  project,
}: AdminProjectsTableRowProps) => {
  const { push } = useRouter();

  const handleClick = useCallback(() => {
    push({
      pathname: "/admin/projects/[id]",
      params: {
        id: project.id,
      },
    });
  }, [project.id, push]);

  return (
    <TableRow onClick={handleClick}>
      <TableCell className="w-[100px] min-w-10 truncate sm:w-[200px]">
        {project.name}
      </TableCell>

      <TableCell className="w-full truncate">{project.shortDesc_fr}</TableCell>
    </TableRow>
  );
};
