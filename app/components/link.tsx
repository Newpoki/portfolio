import classNames from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkAnimationProps =
  | "bright-slide"
  | "expanse-left"
  | "expanse-center"
  | null;

type InternalLinkProps = NextLinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    type: "internal";
  };

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  type: "external";
};

const BRIGHT_SLIDE_ANIMATION_CLASSNAME =
  "after:content-[' '] relative flex flex-col self-start before:absolute before:bottom-0 before:inline-block before:h-[1px] before:w-[10%] before:translate-x-[-100%] before:bg-white before:transition-transform before:duration-500 after:inline-block after:h-[1px] after:w-full after:bg-black hover:before:translate-x-[1100%]";

const EXPANSE_LEFT_CLASSNAME =
  "after:content-[' '] relative flex flex-col self-start after:absolute after:bottom-0 after:inline-block after:h-[1px] after:w-[0] hover:after:w-full after:bg-black after:transition-width";

const EXPANSE_CENTER_CLASSNAME =
  "relative flex flex-col self-start after:content-[' '] after:absolute after:bottom-0 after:block after:h-[1px] after:w-full after:scale-x-0 after:w-full hover:after:scale-x-100 after:bg-black after:transition-transform";

const InternalLink = ({ type, ...others }: InternalLinkProps) => {
  return <NextLink {...others} />;
};

const ExternalLink = ({ type, ...others }: ExternalLinkProps) => {
  return <a {...others} target="_blank" rel="noopener, noreferrer" />;
};

type LinkProps = (InternalLinkProps | ExternalLinkProps) & {
  animation?: LinkAnimationProps;
};

export const Link = ({ animation, ...props }: LinkProps) => {
  const className = classNames(
    {
      [BRIGHT_SLIDE_ANIMATION_CLASSNAME]: animation === "bright-slide",
      [EXPANSE_LEFT_CLASSNAME]: animation === "expanse-left",
      [EXPANSE_CENTER_CLASSNAME]: animation === "expanse-center",
    },
    props.className
  );

  return props.type === "internal" ? (
    <InternalLink {...props} className={className} />
  ) : (
    <ExternalLink {...props} className={className} />
  );
};
