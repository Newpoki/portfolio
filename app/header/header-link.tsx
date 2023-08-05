"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Link } from "../components/link";

type IHeaderLink = {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const HeaderLink = ({
  className,
  href,
  children,
  onClick,
}: IHeaderLink) => {
  const pathname = usePathname();

  const isCurrentRoute =
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      className={classNames("capitalize", {
        "after:scale-x-100": isCurrentRoute,
      })}
      onClick={onClick}
      href={href}
      type="internal"
      animation="expanse-center"
    >
      {children}
    </Link>
  );
};
