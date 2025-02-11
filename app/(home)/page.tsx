import { Metadata } from "next";
import { Typography } from "../components/typography";
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
        <Typography variant="h1">Jason Savelli</Typography>

        <Typography variant="h1">Front End Dev</Typography>
      </div>

      <Typography className="mb-8 lg:max-w-screen-sm" variant="h2">
        I enjoy working on React projects with TypeScript.
      </Typography>

      <DownloadResumeButton className="xl:20 mb-8 md:mb-12"></DownloadResumeButton>

      <LastProject />
    </section>
  );
}
