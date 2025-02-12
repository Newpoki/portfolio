import { Metadata } from "next";
import { LastProject } from "../last-project/LastProject";
import { DownloadResumeButton } from "./download-resume-button";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <section className="lg:flex lg:flex-col lg:items-center lg:text-center">
      <h1 className="mb-8">
        Jason Savelli
        <br />
        Front End Dev
      </h1>

      <h2 className="mb-8 lg:max-w-sm">
        I enjoy working on React projects with TypeScript.
      </h2>

      <DownloadResumeButton className="xl:20 mb-8 md:mb-12"></DownloadResumeButton>

      <LastProject />
    </section>
  );
}
