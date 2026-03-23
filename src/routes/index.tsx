import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon } from "lucide-react";
import { m } from "@/i18n/paraglide/messages";
import { cn } from "@/lib/cn";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: seo({
      title: m.home_metadata_title(),
      description: m.home_metadata_description(),
    }),
  }),
});

function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 text-center md:gap-16">
      <h1
        className="mb-8"
        dangerouslySetInnerHTML={{ __html: m.home_title() }}
      />

      <h2 className="mb-8">{m.home_subtitle()}</h2>

      <a
        href="/resume.pdf"
        download
        className={cn(
          "group relative inline-flex items-center overflow-hidden rounded-md border-2 border-foreground px-5 py-2 font-semibold shadow-primary transition-shadow hover:shadow-2xl",
          "xl:20 mb-8 md:mb-12",
        )}
      >
        {m.home_download_resume_button()}

        <span className="absolute top-0 right-0 left-0 flex h-full translate-y-12 items-center bg-foreground px-5 py-2 whitespace-nowrap text-background transition-transform group-hover:translate-y-0">
          <div className="flex h-12 items-center gap-4">
            <DownloadIcon width={16} />
            <span>{m.home_download_resume_file_name()}</span>
          </div>
        </span>
      </a>
    </section>
  );
}
