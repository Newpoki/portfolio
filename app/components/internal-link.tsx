import classNames from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

type IInternalLinkProps = NextLinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const InternalLink = forwardRef<HTMLAnchorElement, IInternalLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <NextLink
        {...props}
        ref={ref}
        className={classNames("text-base text-black", className)}
      />
    );
  }
);
