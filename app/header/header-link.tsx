"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";

type IHeaderLink = {
  children: React.ReactNode;
  href: string;
};

export const HeaderLink = ({ href, children }: IHeaderLink) => {
  const pathname = usePathname();

  return (
    <div className="group flex flex-col items-center">
      <a className="capitalize" href={href}>
        {children}
      </a>
      <span
        className={classNames(
          "h-[2px] w-0 bg-black transition-width group-hover:w-full",
          {
            "w-full": pathname === href,
          }
        )}
      />
    </div>
  );
};
