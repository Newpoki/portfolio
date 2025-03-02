import { Metadata } from "next";
import { HomeDownloadResumeButton } from "./home-download-resume-button";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Jason Savelli's portfolio",
  description: "The portfolio's home page",
  openGraph: {
    title: "Jason Savelli's portfolio",
    description: "The portfolio's home page",
    images: [
      {
        url: "/about/me.png",
        width: 1200,
        height: 630,
        alt: "A picture of Jason Savelli",
      },
    ],
  },
  twitter: {
    title: "Jason Savelli's portfolio",
    description: "The portfolio's home page",
    images: ["/about/me.png"],
    card: "summary_large_image",
  },
};

export default async function Home() {
  const t = await getTranslations("HOME");

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center md:gap-16">
      <h1 className="mb-8">
        {t.rich("title", {
          br: () => <br />,
        })}
      </h1>

      <h2 className="mb-8">{t("subtitle")}</h2>

      <HomeDownloadResumeButton className="xl:20 mb-8 md:mb-12" />
    </section>
  );
}
