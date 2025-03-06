"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Experience } from "@prisma/client";
import { Locale } from "../../i18n/routing";
import { useCallback, useMemo } from "react";
import { useRouter } from "../../i18n/navigation";
import { generateText } from "@tiptap/react";
import { DEFAULT_EDITOR_EXTENSIONS } from "@/components/ui/editor/editor";

type AdminExperienciesTableRowProps = {
  experience: Experience;
  locale: Locale;
};

export const AdminExperienciesTableRow = ({
  experience,
  locale,
}: AdminExperienciesTableRowProps) => {
  const { push } = useRouter();

  const content = useMemo(() => {
    return generateText(
      JSON.parse(experience[`content_${locale}`]),
      DEFAULT_EDITOR_EXTENSIONS,
    );
  }, [experience, locale]);

  const handleClick = useCallback(() => {
    push({
      pathname: "/admin/experiencies/[id]",
      params: {
        id: experience.id,
      },
    });
  }, [experience.id, push]);

  return (
    <TableRow onClick={handleClick}>
      <TableCell className="w-[100px] min-w-10 truncate sm:w-[200px]">
        {experience.title}
      </TableCell>

      <TableCell className="w-full truncate">{content}</TableCell>
    </TableRow>
  );
};
