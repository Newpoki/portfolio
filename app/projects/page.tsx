import { Metadata } from "next";
import { Typography } from "../components/typography";

export const metadata: Metadata = {
  title: "Jason Savelli - Projects",
  description: "My side projects",
};

export default function Projects() {
  return (
    <div>
      <Typography className="mb-8" variant="h1">
        Projects
      </Typography>
      <Typography variant="h2">Some side projects I have work on.</Typography>
    </div>
  );
}
