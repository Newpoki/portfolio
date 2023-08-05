import classNames from "classnames";
import { forwardRef, useMemo } from "react";
import { Box, PolymorphicComponentPropWithRef, PolymorphicRef } from "./box";

type TypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2";

type Props<C extends React.ElementType> = PolymorphicComponentPropWithRef<C> & {
  variant?: TypographyVariants;
};

type TypographyComponent = <C extends React.ElementType = "p">(
  props: Props<C>
) => React.ReactNode;

export const Typography: TypographyComponent = forwardRef(
  <C extends React.ElementType = "p">(
    props: Props<C>,
    ref: PolymorphicRef<C>
  ) => {
    const as = useMemo(() => {
      // Using the props.as if defined
      if (props.as != null) {
        return props.as;
      }

      // Otherwise determine it accordingly to the variant
      switch (props.variant) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return props.variant;
        case "body1":
        case "body2":

        default:
          return "p";
      }
    }, [props.as, props.variant]);

    const classes = useMemo(() => {
      switch (props.variant) {
        case "h1":
          return "text-2xl sm:text-3xl lg:text-5xl font-bold uppercase xl:text-7xl 2xl:text-9xl !leading-extra-tight";
        case "h2":
          return "text-md sm:text-lg lg:text-xl font-semibold xl:text-2xl";
      }
    }, [props.variant]);

    return (
      <Box
        {...props}
        className={classNames(classes, props.className)}
        as={as}
        ref={ref}
      />
    );
  }
);
