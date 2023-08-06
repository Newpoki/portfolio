import Image from "next/image";
import { FadeIn } from "../components/fade-in";
import { SlideUp } from "../components/slide-up";
import { SlightlySlideUp } from "../components/slightly-slide-up";
import { Typography } from "../components/typography";

export default function About() {
  return (
    <div>
      <div className="mb-8 flex flex-col">
        <SlideUp>
          <Typography variant="h1">frontend</Typography>
        </SlideUp>

        <SlideUp className="animation-delay-150">
          <Typography variant="h1">and guitar</Typography>
        </SlideUp>
      </div>

      <FadeIn className="flex flex-col animation-delay-[900ms] lg:mb-8">
        <div className="mb-12 lg:max-w-screen-sm">
          <Typography variant="h2">
            Learn more about me, how I got here, what do I love in Front-End and
            also some guitar riffs.
          </Typography>
        </div>

        <SlightlySlideUp className="relative mb-12 flex flex-1 animation-delay-[900ms]">
          <Image
            src="/me.jpeg"
            alt="Pictures of me drinking a Tavel wine"
            fill
            className="!relative object-cover"
          />
        </SlightlySlideUp>
      </FadeIn>
    </div>
  );
}
