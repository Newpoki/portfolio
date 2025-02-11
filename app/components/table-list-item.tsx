import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
  label: string;
};

export const TabeListItem = ({ children, className, label }: Props) => {
  return (
    <li
      className={classNames(
        "flex border-collapse items-center justify-between gap-8 border-t py-8 last:border-b",
        className
      )}
    >
      <p className="font-medium">{label}</p>
      <p className="font-medium">{children}</p>
    </li>
  );
};
