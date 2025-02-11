import { Metadata } from "next";
import { LastProject } from "../last-project/LastProject";
import { DownloadResumeButton } from "./download-resume-button";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <section>
      <div className="mb-8 flex flex-col">
        <h1 className="flex flex-col">
          <span>Jason Savelli</span>
          <span>Front End Dev</span>
        </h1>
      </div>

      <h2 className="mb-8 lg:max-w-screen-sm">
        I enjoy working on React projects with TypeScript.
      </h2>

      <DownloadResumeButton className="xl:20 mb-8 md:mb-12"></DownloadResumeButton>

      <LastProject />
    </section>
  );
}
