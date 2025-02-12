"use client";

import { Link } from "@/components/ui/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  children: React.ReactNode;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const HeaderLink = ({ className, href, children, onClick }: Props) => {
  const pathname = usePathname();

  const isCurrentRoute =
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      className={classNames(className, "capitalize", {
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
