"use client";

import { Link } from "../components/link";
import { Typography } from "../components/typography";
import { FooterScrollTopButton } from "./footer-scroll-top-button";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/experiencies") {
    return null;
  }

  return (
    <footer className="mt-auto flex flex-col gap-8 py-6 pt-28 text-center lg:text-left">
      <div>
        <Typography variant="h1">Jason Savelli</Typography>
        <Typography variant="h1">Front End Dev</Typography>
      </div>

      <section className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-4">
          <Link
            type="external"
            href="https://www.linkedin.com/in/jason-savelli/"
          >
            Linkedin
          </Link>
          <Link type="external" href="https://x.com/Newpokii">
            Twitter
          </Link>
          <Link type="external" href="https://github.com/Newpoki">
            Github
          </Link>
          <Link type="external" href="https://www.instagram.com/newpoki/">
            Instagram
          </Link>
          <Link type="external" href="mailto:savellijason@gmail.com">
            Email
          </Link>
        </div>

        <FooterScrollTopButton />

        <Typography>Copyright©JasonSavelli</Typography>
      </section>
    </footer>
  );
};
