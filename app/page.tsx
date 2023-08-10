import { Metadata } from "next";
import DownloadIcon from "@/public/icons/download.svg";
import { RevealButton } from "./components/reveal-button";
import { Typography } from "./components/typography";
import { FadeIn } from "./components/fade-in";
import { SlideUp } from "./components/slide-up";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <section>
      <div className="mb-8 flex flex-col">
        <SlideUp>
          <Typography variant="h1">Jason Savelli</Typography>
        </SlideUp>

        <SlideUp className="animation-delay-150">
          <Typography variant="h1">Front End Dev</Typography>
        </SlideUp>
      </div>

      <FadeIn className="animation-delay-[1150ms]">
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
        >
          Download my CV
        </RevealButton>
      </FadeIn>
    </section>
  );
}
