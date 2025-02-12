import classNames from "classnames";
import DownloadIcon from "@/public/icons/download.svg";

type DownloadResumeButtonProps = {
  className: string;
};

export const DownloadResumeButton = ({
  className,
}: DownloadResumeButtonProps) => {
  return (
    <a
      href="/resume.pdf"
      download
      className={classNames(
        "group border-foreground relative inline-flex items-center overflow-hidden rounded-3xl border-2 px-8 py-3 font-semibold lg:px-5 lg:py-2",
        className,
      )}
    >
      Download my CV
      <span className="bg-foreground text-background absolute top-0 right-0 left-0 flex h-full translate-y-12 items-center px-8 py-3 whitespace-nowrap transition-transform group-hover:translate-y-0 lg:px-5 lg:py-2">
        <div className="flex h-12 items-center gap-4">
          <DownloadIcon width={16} />
          <span>jason-cv.pdf</span>
        </div>
      </span>
    </a>
  );
};
