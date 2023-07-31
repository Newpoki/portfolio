import classNames from "classnames";
import { Box, PolymorphicComponentPropWithRef, PolymorphicRef } from "./box";
import { forwardRef } from "react";

type Props<C extends React.ElementType> = PolymorphicComponentPropWithRef<C> & {
  wrapperClassName?: string;
};

type SlideUpComponent = <C extends React.ElementType = "div">(
  props: Props<C>
) => React.ReactNode;

// Have to specify "translate-y-full" because animation delay may be added
export const slideUpAnimationClassname =
  "translate-y-full animate-[slide-up_0.8s_ease-in_forwards]";

export const SlideUp: SlideUpComponent = forwardRef(
  <C extends React.ElementType = "div">(
    props: Props<C>,
    ref: PolymorphicRef<C>
  ) => {
    const as = props.as || "div";

    return (
      <div className={classNames("overflow-hidden", props.wrapperClassName)}>
        <Box
          {...props}
          className={classNames(slideUpAnimationClassname, props.className)}
          as={as}
          ref={ref}
        />
      </div>
    );
  }
);
