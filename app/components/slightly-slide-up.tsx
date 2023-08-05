import classNames from "classnames";
import { Box, PolymorphicComponentPropWithRef, PolymorphicRef } from "./box";
import { forwardRef } from "react";

type Props<C extends React.ElementType> = PolymorphicComponentPropWithRef<C>;

type FadeInComponent = <C extends React.ElementType = "div">(
  props: Props<C>
) => React.ReactNode;

// Have to specify "translate-y-full" because animation delay may be added
export const slightlySlideUpAnimationClassname =
  "translate-y-full animate-[slightly-slide-up_0.3s_ease-in-out_forwards]";

export const SlightlySlideUp: FadeInComponent = forwardRef(
  <C extends React.ElementType = "div">(
    props: Props<C>,
    ref: PolymorphicRef<C>
  ) => {
    const as = props.as || "div";

    return (
      <Box
        {...props}
        className={classNames(
          slightlySlideUpAnimationClassname,
          props.className
        )}
        as={as}
        ref={ref}
      />
    );
  }
);
