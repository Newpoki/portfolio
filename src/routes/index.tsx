import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
import { cn } from "@/lib/cn";
import DownloadIcon from "@/icons/download.svg?react";

const Home = () => {
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
          "group border-foreground shadow-primary relative inline-flex items-center overflow-hidden rounded-md border-2 px-5 py-2 font-semibold transition-shadow hover:shadow-2xl",
          "xl:20 mb-8 md:mb-12",
        )}
      >
        {m.home_download_resume_button()}

        <span className="bg-foreground text-background absolute top-0 right-0 left-0 flex h-full translate-y-12 items-center px-5 py-2 whitespace-nowrap transition-transform group-hover:translate-y-0">
          <div className="flex h-12 items-center gap-4">
            <DownloadIcon width={16} />
            <span>{m.home_download_resume_file_name()}</span>
          </div>
        </span>
      </a>
    </section>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
