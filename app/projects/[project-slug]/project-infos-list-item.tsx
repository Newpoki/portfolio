import { Typography } from "@/app/components/typography";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  label: string;
};

export const ProjectInfosListItem = ({ children, label }: Props) => {
  return (
    <li
      className={classNames(
        "flex border-collapse items-center justify-between gap-8 border-t-1 border-gray-300 py-8 last:border-b-1"
      )}
    >
      <Typography>{label}</Typography>
      <Typography>{children}</Typography>
    </li>
  );
};
