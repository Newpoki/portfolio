import { Metadata } from "next";
import { HomeDownloadResumeButton } from "./home-download-resume-button";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default async function Home() {
  const t = await getTranslations("HOME");

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center md:gap-16">
      <h1 className="mb-8">
        {t.rich("title", {
          breakline: () => <br />,
        })}
      </h1>

      <h2 className="mb-8">{t("subtitle")}</h2>

      <HomeDownloadResumeButton className="xl:20 mb-8 md:mb-12" />
    </section>
  );
}
