import { Metadata } from "next";
import DownloadIcon from "@/public/icons/download.svg";
import { RevealButton } from "./components/reveal-button";
import { Typography } from "./components/typography";
import { LastProject } from "./last-project/LastProject";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <section>
      <div className="mb-8 flex flex-col">
        <Typography variant="h1">Jason Savelli</Typography>

        <Typography variant="h1">Front End Dev</Typography>
      </div>

      <Typography className="mb-8 lg:max-w-screen-sm" variant="h2">
        I enjoy working on React projects with TypeScript.
      </Typography>

      <RevealButton
        revealed={
          <div className="flex h-12 items-center gap-4">
            <DownloadIcon width={16} />
            <span>jason-cv.pdf</span>
          </div>
        }
        href="/resume.pdf"
        download
        className="xl:20 mb-8 md:mb-12"
      >
        Download my CV
      </RevealButton>

      <LastProject />
    </section>
  );
}
