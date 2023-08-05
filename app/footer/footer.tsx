import { ExternalLink } from "../components/external-link";
import { Typography } from "../components/typography";
import { FooterScrollTopButton } from "./footer-scroll-top-button";

export const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col gap-8 py-6 pt-28 text-center lg:text-left">
      <div>
        <Typography variant="h1">Jason Savelli</Typography>
        <Typography variant="h1">Front End Dev</Typography>
      </div>

      <section className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-4">
          <ExternalLink href="https://www.linkedin.com/in/jason-savelli/">
            Linkedin
          </ExternalLink>
          <ExternalLink href="https://x.com/Newpokii">Twitter</ExternalLink>
          <ExternalLink href="https://github.com/Newpoki">Github</ExternalLink>
          <ExternalLink href="mailto:savellijason@gmail.com">
            Email
          </ExternalLink>
        </div>

        <FooterScrollTopButton />

        <Typography>Copyright©JasonSavelli</Typography>
      </section>
    </footer>
  );
};
