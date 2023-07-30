"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";

type IHeaderLink = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export const HeaderLink = ({ className, href, children }: IHeaderLink) => {
  const pathname = usePathname();

  return (
    <div
      className={classNames("group/link flex flex-col items-center", className)}
    >
      <a className="capitalize" href={href}>
        {children}
      </a>
      <span
        className={classNames(
          "h-[2px] w-0 bg-black transition-width group-hover/link:w-full",
          {
            "w-full": pathname === href,
          }
        )}
      />
    </div>
  );
};
