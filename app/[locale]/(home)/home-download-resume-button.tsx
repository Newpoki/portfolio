import classNames from "classnames";
import DownloadIcon from "@/public/icons/download.svg";
import { getTranslations } from "next-intl/server";

type HomeDownloadResumeButtonProps = {
  className: string;
};

export const HomeDownloadResumeButton = async ({
  className,
}: HomeDownloadResumeButtonProps) => {
  const t = await getTranslations("HOME");

  return (
    <a
      href="/resume.pdf"
      download
      className={classNames(
        "group border-foreground shadow-primary relative inline-flex items-center overflow-hidden rounded-md border-2 px-5 py-2 font-semibold transition-shadow hover:shadow-2xl",
        className,
      )}
    >
      {t("download-resume-button")}
      <span className="bg-foreground text-background absolute top-0 right-0 left-0 flex h-full translate-y-12 items-center px-5 py-2 whitespace-nowrap transition-transform group-hover:translate-y-0">
        <div className="flex h-12 items-center gap-4">
          <DownloadIcon width={16} />
          <span>{t("download-resume-file-name")}</span>
        </div>
      </span>
    </a>
  );
};
