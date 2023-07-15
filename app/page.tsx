import { Metadata } from "next";
import DownloadIcon from "@/public/icons/download.svg";
import { RevealButton } from "./reveal-button";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <div>
      <h1 className="mb-8 flex flex-col">
        <span className="text-9xl font-bold uppercase">Jason Savelli</span>
        <span className="text-9xl font-bold uppercase">
          Front End developper
        </span>
      </h1>

      <h2 className="mb-8 text-2xl font-semibold">
        I enjoy working on React projects with TypeScript.
      </h2>

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
