import classNames from "classnames";
import { Typography } from "./typography";
import { forwardRef } from "react";
import NextLink, { LinkProps } from "next/link";

type LinkAnimationProps = "bright-slide" | "expanse-left" | "expanse-center";

type CommonProps = {
  animation?: LinkAnimationProps;
};

type InternalLinkProps = CommonProps &
  LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    type: "internal";
  };

type ExternalLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    type: "external";
  };

const BRIGHT_SLIDE_ANIMATION_CLASSNAME =
  "after:content-[' '] relative flex flex-col self-start before:absolute before:bottom-0 before:inline-block before:h-[1px] before:w-[10%] before:translate-x-[-100%] before:bg-white before:transition-transform before:duration-500 after:inline-block after:h-[1px] after:w-full after:bg-black hover:before:translate-x-[1100%]";

const EXPANSE_LEFT_CLASSNAME =
  "after:content-[' '] relative flex flex-col self-start after:absolute after:bottom-0 after:inline-block after:h-[1px] after:w-[0] hover:after:w-full after:bg-black after:transition-width";

const EXPANSE_CENTER_CLASSNAME =
  "relative flex flex-col self-start" +
  "after:content-[' '] after:absolute after:bottom-0 after:block after:h-[1px] after:w-full after:scale-x-0 after:w-full hover:after:scale-x-100 after:bg-black after:transition-transform";

type Props = InternalLinkProps | ExternalLinkProps;

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ animation = "expanse-left", ...props }, ref) => {
    const className = classNames(
      {
        [BRIGHT_SLIDE_ANIMATION_CLASSNAME]: animation === "bright-slide",
        [EXPANSE_LEFT_CLASSNAME]: animation === "expanse-left",
        [EXPANSE_CENTER_CLASSNAME]: animation === "expanse-center",
      },
      props.className
    );

    if (props.type === "internal") {
      return (
        <Typography {...props} as={NextLink} ref={ref} className={className} />
      );
    }

    return (
      <Typography
        {...props}
        as="a"
        className={className}
        ref={ref}
        target="_blank"
        rel="noopener, noreferrer"
      />
    );
  }
);
