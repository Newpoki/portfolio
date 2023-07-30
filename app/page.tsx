import { Metadata } from "next";
import DownloadIcon from "@/public/icons/download.svg";
import { RevealButton } from "./reveal-button";
import { Typography } from "./components/typography";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <div>
      <div className="mb-8 flex flex-col">
        <Typography variant="h1">Jason Savelli</Typography>
        <Typography variant="h1">Front End Dev</Typography>
      </div>

      <Typography className="mb-8" variant="h2">
        I enjoy working on React projects with TypeScript.
      </Typography>

      <RevealButton
        hidden={
          <div className="flex h-12 items-center gap-4">
            <DownloadIcon width={16} />
            <span>jason-cv.pdf</span>
          </div>
        }
      >
        Download my CV
      </RevealButton>
    </div>
  );
}
