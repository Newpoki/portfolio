import { Metadata } from "next";
import { HomeDownloadResumeButton } from "./home-download-resume-button";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center md:gap-16">
      <h1 className="mb-8">
        Jason Savelli
        <br />
        Front End Dev
      </h1>

      <h2 className="mb-8">
        I enjoy working on React projects with TypeScript.
      </h2>

      <HomeDownloadResumeButton className="xl:20 mb-8 md:mb-12"></HomeDownloadResumeButton>
    </section>
  );
}
