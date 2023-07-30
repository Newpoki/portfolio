import { Metadata } from "next";
import DownloadIcon from "@/public/icons/download.svg";
import { RevealButton } from "./reveal-button";
import { Typography } from "./components/typography";
import { FadeIn } from "./components/fade-in";
import { SlideUp } from "./components/slide-up";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <div>
      <div className="mb-8 flex flex-col">
        <SlideUp>
          <Typography variant="h1">Jason Savelli</Typography>
        </SlideUp>

        <SlideUp>
          <Typography
            variant="h1"
            // Muse specify translate-y-full because we're adding delay to animation
            className="animation-delay-150 translate-y-full animate-[slide-up_1s_ease-in-out_forwards_150ms]"
          >
            Front End Dev
          </Typography>
        </SlideUp>
      </div>

      {/* 1150 so the second title animation is ended */}
      <FadeIn className="animation-delay-[1150ms]">
        <Typography className="mb-8 " variant="h2">
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
      </FadeIn>
    </div>
  );
}
