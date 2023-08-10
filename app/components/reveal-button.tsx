import classNames from "classnames";
import { Box, PolymorphicComponentPropWithRef, PolymorphicRef } from "./box";
import { forwardRef } from "react";

type Props<C extends React.ElementType> = PolymorphicComponentPropWithRef<C> & {
  children: React.ReactNode;
  revealed: React.ReactNode;
  size?: "small" | "normal";
};

type RevealButtonComponent = <C extends React.ElementType = "a">(
  props: Props<C>
) => React.ReactNode;

export const RevealButton: RevealButtonComponent = forwardRef(
  <C extends React.ElementType = "a">(
    props: Props<C>,
    ref: PolymorphicRef<C>
  ) => {
    const as = props.as ?? "a";

    return (
      <Box
        {...props}
        as={as}
        className={classNames(
          "group relative inline-flex items-center overflow-hidden rounded-3xl border-2 border-black font-semibold",
          {
            "px-8 py-3": props.size === "normal",
            "px-5 py-2": props.size === "small",
            "px-8 py-3 lg:px-5 lg:py-2": props.size == null,
          },
          props.className
        )}
        ref={ref}
      >
        {props.children}
        <span
          className={classNames(
            "absolute left-0 right-0 top-0 flex h-full translate-y-12 items-center whitespace-nowrap bg-black text-white transition-transform group-hover:translate-y-0",
            {
              "px-8 py-3": props.size === "normal",
              "px-5 py-2": props.size === "small",
              "px-8 py-3 lg:px-5 lg:py-2": props.size == null,
            }
          )}
        >
          {props.revealed}
        </span>
      </Box>
    );
  }
);
