import classNames from "classnames";
import { Box, PolymorphicComponentPropWithRef, PolymorphicRef } from "./box";
import { forwardRef } from "react";

type Props<C extends React.ElementType> = PolymorphicComponentPropWithRef<C>;

type FadeInComponent = <C extends React.ElementType = "div">(
  props: Props<C>
) => React.ReactNode;

// Have to specify opacity 0 because animation delay may be added
const fadeInAnimationClassname =
  "animate-[opacity_0.3s_ease-in-out_forwards] opacity-0";

export const FadeIn: FadeInComponent = forwardRef(
  <C extends React.ElementType = "div">(
    props: Props<C>,
    ref: PolymorphicRef<C>
  ) => {
    const as = props.as || "div";

    return (
      <Box
        {...props}
        className={classNames(fadeInAnimationClassname, props.className)}
        as={as}
        ref={ref}
      />
    );
  }
);
