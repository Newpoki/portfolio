import { useMemo } from "react";
import { generateText } from "@tiptap/react";
import { useNavigate } from "@tanstack/react-router";
import type { Experience } from "@prisma/client";
import { getLocale } from "@/i18n/paraglide/runtime";
import { DEFAULT_EDITOR_EXTENSIONS } from "@/ui/editor/editor";
import { TableCell, TableRow } from "@/ui/table";

type AdminExperienciesTableRowProps = {
  experience: Experience;
};

export const AdminExperienciesTableRow = ({
  experience,
}: AdminExperienciesTableRowProps) => {
  const navigate = useNavigate();

  const locale = getLocale();

  const content = useMemo(() => {
    return generateText(
      JSON.parse(experience[`content_${locale}`]) ?? "",
      DEFAULT_EDITOR_EXTENSIONS,
    );
  }, [experience, locale]);

  const handleClick = () => {
    navigate({
      // TODO: Modify DB so we can use a slug
      to: "/admin/experiencies/$id",
      params: {
        id: experience.id,
      },
    });
  };

  return (
    <TableRow onClick={handleClick}>
      <TableCell className="w-25 min-w-10 truncate sm:w-50">
        {experience.title}
      </TableCell>

      <TableCell className="w-full truncate">{content}</TableCell>
    </TableRow>
  );
};
