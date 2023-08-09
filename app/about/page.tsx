import Image from "next/image";
import { FadeIn } from "../components/fade-in";
import { SlideUp } from "../components/slide-up";
import { SlightlySlideUp } from "../components/slightly-slide-up";
import { Typography } from "../components/typography";
import { Link } from "../components/link";

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

      <FadeIn className="flex flex-col gap-8 animation-delay-[900ms] lg:gap-20 xl:gap-40">
        <div className=" lg:max-w-screen-sm ">
          <Typography variant="h2">
            Learn more about me, how I got here, what do I love in Front-End and
            also some guitar riffs.
          </Typography>
        </div>

        <SlightlySlideUp className="relativeflex flex-1 animation-delay-[900ms]">
          <Image
            src="/about/me.jpeg"
            alt="Pictures of me drinking a Tavel wine"
            fill
            className="!relative rounded-lg object-cover"
          />
        </SlightlySlideUp>

        <div className="lg:1/2 mx-auto flex flex-col gap-8 md:w-2/3">
          <Typography variant="h2">Who am I ?</Typography>

          <Typography variant="body2">
            I&apos;m Jason Savelli (He / Him). I was born on the 24th of
            December 1996, in Marignane, France. I&apos; living in Barbentane,
            near Avignon, France. I have 2 beautifull doggos that I love more
            than anything, playing guitar, video games
          </Typography>

          <Typography variant="h2">How did I get there ?</Typography>

          <Typography variant="body2">
            I was an{" "}
            <Link
              className="inline-flex font-semibold"
              type="external"
              href="https://oclock.io/"
            >
              O&apos;Clock
            </Link>{" "}
            student in 2019, where I deepened my love for the web ecosystem.
            Early in my journey in the web ecosystem, I&apos;ve found that I
            really love Javascript so I&apos;m giving 200% of myself in to get
            better and better everyday.
          </Typography>
        </div>

        <div className="flex flex-col gap-8 lg:gap-20">
          <Typography className="lg:1/2 mx-auto md:w-2/3" variant="h2">
            When I&apos;m not at the computer, you can find me playing guitar,
            video games or taking photo of beautifull dogs.
          </Typography>

          <div className="grid gap-4 lg:grid-cols-3 lg:overflow-hidden lg:rounded-xl">
            <Image
              src="/about/nouchka-redux.webp"
              fill
              alt="Picture of Redux and Nouchka, loved dogs"
              className="!relative rounded-xl object-cover lg:rounded-none"
            />

            <video
              src="/about/guitar.webm"
              className="h-full rounded-xl object-cover lg:rounded-none"
              autoPlay
              loop
              muted
            />

            <Image
              src="/about/redux-and-me.webp"
              fill
              alt="Picture of Redux and Nouchka, loved dogs"
              className="!relative rounded-xl object-cover lg:rounded-none"
            />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
