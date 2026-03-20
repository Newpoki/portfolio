import { Link as TSRLink } from "@tanstack/react-router";
import type { LinkProps as TSRLinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

type LinkAnimationProps =
  | "bright-slide"
  | "expanse-left"
  | "expanse-center"
  | null;

export type InternalLinkProps = TSRLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    type: "internal";
  };

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  type: "external";
};

const BRIGHT_SLIDE_ANIMATION_CLASSNAME =
  "after:content-[' '] relative flex flex-col self-start before:absolute before:bottom-0 before:inline-block before:h-[1px] before:w-[10%] before:translate-x-[-100%] before:bg-background before:transition-transform before:duration-500 after:inline-block after:h-[1px] after:w-full after:bg-foreground hover:before:translate-x-[1100%]";

const EXPANSE_CENTER_CLASSNAME =
  "relative flex flex-col self-start after:content-[' '] after:absolute after:bottom-0 after:block after:h-[1px] after:w-full after:scale-x-0 after:w-full hover:after:scale-x-100 after:bg-foreground after:transition-transform";

//   TODO: Fix this false error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InternalLink = ({ type, ...others }: InternalLinkProps) => {
  return <TSRLink {...others} />;
};

//   TODO: Fix this false error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExternalLink = ({ type, ...others }: ExternalLinkProps) => {
  return <a {...others} target="_blank" rel="noopener, noreferrer" />;
};

export type LinkProps = (InternalLinkProps | ExternalLinkProps) & {
  animation?: LinkAnimationProps;
};

export const Link = ({ animation = "expanse-center", ...props }: LinkProps) => {
  const className = cn(
    {
      [BRIGHT_SLIDE_ANIMATION_CLASSNAME]: animation === "bright-slide",
      [EXPANSE_CENTER_CLASSNAME]: animation === "expanse-center",
    },
    props.className,
  );

  return props.type === "internal" ? (
    <InternalLink {...props} className={className} />
  ) : (
    <ExternalLink {...props} className={className} />
  );
};
