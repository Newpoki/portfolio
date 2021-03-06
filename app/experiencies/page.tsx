import { PrismaClient } from "@prisma/client";
import { SlideUp } from "../components/slide-up";
import { Typography } from "../components/typography";
import { ExperienceTimelineCard } from "./experience-timeline-card";
import { serialize } from "next-mdx-remote/serialize";
import { FadeIn } from "../components/fade-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jason Savelli - Experiencies",
  description: "All my previous experiencies",
};

const prisma = new PrismaClient();

const fetchExperiencies = async () => {
  const experiencies = await prisma.experience.findMany({
    orderBy: {
      startedAt: "desc",
    },
  });

  const serializedExperiencies = experiencies.map(async (experience) => {
    const content = await serialize(experience.content);

    return { ...experience, content };
  });

  return Promise.all(serializedExperiencies);
};

export default async function Experiencies() {
  const experiencies = await fetchExperiencies();

  return (
    <div>
      <div className="mb-8">
        <SlideUp>
          <Typography variant="h1">Experiencies</Typography>
        </SlideUp>
      </div>

      <FadeIn className="animation-delay-[900ms]">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">
          <Typography className="md:max-w-screen-sm" variant="h2">
            Some past experiencies I went through.
          </Typography>

          <Typography className="whitespace-nowrap font-semibold">
            Discover ↓
          </Typography>
        </div>

        <ul className="flex flex-col">
          {experiencies.map((experience) => (
            <ExperienceTimelineCard {...experience} key={experience.id} />
          ))}
        </ul>
      </FadeIn>
    </div>
  );
}
