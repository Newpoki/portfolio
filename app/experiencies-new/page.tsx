import { Typography } from "../components/typography";
import { ExperienciesFlow } from "./experiencies-flow";

export default function ExperienciesNewPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Typography className="mb-8" variant="h1">
        Experiencies
      </Typography>

      <ExperienciesFlow />
    </div>
  );
}
