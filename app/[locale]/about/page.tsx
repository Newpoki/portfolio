import Image from "next/image";
import { Metadata } from "next";
import { Link } from "@/components/ui/link";
import { TabeListItem } from "@/components/ui/table-list-item";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Jason Savelli - About",
  description: "Learn more about me",
};

export default async function About() {
  const t = await getTranslations("ABOUT");

  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex max-h-[calc(100dvh-var(--header-h)-var(--header-m-b))] flex-col gap-8 xl:pb-10">
        <h1>
          {t.rich("title", {
            br: () => <br />,
          })}
        </h1>

        <h2>{t("subtitle")}</h2>

        <Image
          src="/about/me.png"
          alt={t("about-me-picture-alt")}
          fill
          className="relative! min-h-full rounded-lg object-cover"
          priority
        />
      </div>

      <section className="flex flex-col gap-8 lg:gap-20 xl:gap-40">
        <section className="mx-auto flex flex-col gap-8 md:w-2/3 lg:w-1/2">
          <h2>{t("who-am-i.title")}</h2>

          <p>{t("who-am-i.content")}</p>

          <h2>{t("how-did-i-get-there.title")}</h2>

          <p>
            {t.rich("how-did-i-get-there.content", {
              oclock: (chunks) => (
                <Link
                  className="inline-flex font-semibold"
                  type="external"
                  href="https://oclock.io/"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>

          <h2>{t("dream-stack.title")}</h2>
          <ul>
            <TabeListItem label={t("dream-stack.tools.front-end.title")}>
              {t("dream-stack.tools.front-end.content")}
            </TabeListItem>

            <TabeListItem label={t("dream-stack.tools.component.title")}>
              {t("dream-stack.tools.component.content")}
            </TabeListItem>

            <TabeListItem label={t("dream-stack.tools.data.title")}>
              {t("dream-stack.tools.data.content")}
            </TabeListItem>

            <TabeListItem label={t("dream-stack.tools.state.title")}>
              {t("dream-stack.tools.state.content")}
            </TabeListItem>

            <TabeListItem label={t("dream-stack.tools.date.title")}>
              {t("dream-stack.tools.date.content")}
            </TabeListItem>

            <TabeListItem label={t("dream-stack.tools.unit-tests.title")}>
              {t("dream-stack.tools.unit-tests.content")}
            </TabeListItem>

            <TabeListItem
              label={t("dream-stack.tools.integration-tests.title")}
            >
              {t("dream-stack.tools.integration-tests.content")}
            </TabeListItem>
          </ul>
        </section>

        <section className="flex flex-col gap-8 lg:gap-20">
          <h2 className="lg:1/2 mx-auto md:w-2/3">{t("outside")}</h2>

          <div className="relative grid gap-4 lg:grid-cols-3 lg:overflow-hidden lg:rounded-xl">
            <Image
              src="/about/nouchka-redux.webp"
              fill
              alt={t("dogs-picture-alt")}
              className="relative! rounded-xl object-cover lg:rounded-none"
              sizes="100%"
            />

            <video
              // Using mp4 instead of webm because iOS doesn't support it yet
              src="/about/guitar.mp4"
              // min-h-full and w-full required because otherwise object-cover won't work in iOS
              className="h-full min-h-full w-full rounded-xl object-cover lg:rounded-none"
              autoPlay
              loop
              muted
              // https://webkit.org/blog/6784/new-video-policies-for-ios/ Needed for iOS video to autoplay
              playsInline
            />

            <Image
              src="/about/me-and-friends.webp"
              fill
              alt={t("me-and-my-friends-alt")}
              className="relative! rounded-xl object-cover lg:rounded-none"
              priority
              sizes="100%"
            />
          </div>
        </section>
      </section>
    </div>
  );
}
