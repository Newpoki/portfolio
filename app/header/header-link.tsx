"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { InternalLink } from "../components/internal-link";

type IHeaderLink = {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
    <div
      className={classNames("group/link flex flex-col items-center", className)}
      onClick={onClick}
    >
      <InternalLink className="capitalize" href={href}>
        {children}
      </InternalLink>

      <span
        className={classNames(
          "h-[2px] w-0 bg-black transition-width group-hover/link:w-full",
          {
            "w-full": isCurrentRoute,
          }
        )}
      />
    </div>
  );
};
