import { FadeIn } from "@/app/components/fade-in";
import { SlideUp } from "@/app/components/slide-up";
import { Typography } from "@/app/components/typography";

type Props = {
  params: {
    "project-slug": string;
  };
};

export default function ProjectSlug(props: Props) {
  return (
    <div>
      <div className="mb-8">
        <SlideUp>
          <Typography variant="h1">{props.params["project-slug"]}</Typography>
        </SlideUp>
      </div>

      <FadeIn className="animation-delay-[900ms] lg:mb-8">
        <div className="mb-4">
          <Typography variant="h2">
            Some side projects I have worked on.
          </Typography>
        </div>
      </FadeIn>
    </div>
  );
}
