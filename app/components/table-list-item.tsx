import classNames from "classnames";
import { Typography } from "./typography";

type Props = {
  children: React.ReactNode;
  className?: string;
  label: string;
};

export const TabeListItem = ({ children, className, label }: Props) => {
  return (
    <li
      className={classNames(
        "flex border-collapse items-center justify-between gap-8 border-t-1 border-gray-300 py-8 last:border-b-1",
        className
      )}
    >
      <Typography className="font-medium">{label}</Typography>
      <Typography variant="body2" className="font-medium">
        {children}
      </Typography>
    </li>
  );
};
