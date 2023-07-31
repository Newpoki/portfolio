// Imported from https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/#how-to-use-typescript-build-strongly-typed-polymorphic-components-react

import React, { forwardRef } from "react";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is the type for the "ref" only
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

// This is a new type utitlity with ref!
export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * This is the updated component props using PolymorphicComponentPropWithRef
 */
type BoxProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<C>;

/**
 * This is the type used in the type annotation for the component
 */
type BoxComponent = <C extends React.ElementType = "div">(
  props: BoxProps<C>
) => React.ReactNode;

export const Box: BoxComponent = forwardRef(
  <C extends React.ElementType = "div">(
    { as, children, ...props }: BoxProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "div";

    return (
      <Component {...props} ref={ref}>
        {children}
      </Component>
    );
  }
);
