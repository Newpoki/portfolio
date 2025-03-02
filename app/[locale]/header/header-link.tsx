"use client";

import { Link } from "@/components/ui/link";
import { Link as I18NextLink } from "../i18n/navigation";
import classNames from "classnames";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = React.ComponentProps<typeof I18NextLink> & {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const HeaderLink = ({ className, children, onClick, href }: Props) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";

  // Removing router groups such as (/home) from URL
  const isActive = pathname.replace(/\(\w+\)/g, "") === href;

  return (
    <Link
      className={classNames(className, "capitalize", {
        "after:scale-x-100": isActive,
      })}
      onClick={onClick}
      type="internal"
      animation="expanse-center"
      href={href}
    >
      {children}
    </Link>
  );
};
