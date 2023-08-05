import classNames from "classnames";
import { Typography } from "./typography";
import { forwardRef } from "react";

type Props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const ExternalLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Typography
        {...props}
        as="a"
        className={classNames(
          "after:content-[' '] :hover relative flex flex-col self-start before:absolute before:bottom-0 before:inline-block before:h-[1px] before:w-[10%] before:translate-x-[-100%] before:bg-white before:transition-transform before:duration-500 after:inline-block after:h-[1px] after:w-full after:bg-black hover:before:translate-x-[1100%]",
          className
        )}
        ref={ref}
        target="_blank"
        rel="noopener, noreferrer"
      />
    );
  }
);
