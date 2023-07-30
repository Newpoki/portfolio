import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { useMemo } from "react";

type TypographyH1 = {
  variant: "h1";
} & React.HTMLProps<HTMLHeadingElement>;

type TypographyH2 = {
  variant: "h2";
} & React.HTMLProps<HTMLHeadingElement>;

type TypographyH3 = {
  variant: "h3";
} & React.HTMLProps<HTMLHeadingElement>;

type TypographyH4 = {
  variant: "h4";
} & React.HTMLProps<HTMLHeadingElement>;

type TypographyH5 = {
  variant: "h5";
} & React.HTMLProps<HTMLHeadingElement>;

type TypographyH6 = {
  variant: "h6";
} & React.HTMLProps<HTMLHeadingElement>;

type TypographyBody1 = {
  variant: "body1";
} & React.HTMLProps<HTMLSpanElement>;

type TypographyBody2 = {
  variant: "body2";
} & React.HTMLProps<HTMLSpanElement>;

type Props =
  | TypographyH1
  | TypographyH2
  | TypographyH3
  | TypographyH4
  | TypographyH5
  | TypographyH6
  | TypographyBody1
  | TypographyBody2;

export const Typography = (props: Props) => {
  const classes = useMemo(() => {
    switch (props.variant) {
      case "h1":
        return "text-2xl sm:text-3xl lg:text-5xl font-bold uppercase xl:text-7xl 2xl:text-9xl";
      case "h2":
        return "text-md sm:text-lg lg:text-xl font-semibold xl:text-2xl";
    }
  }, [props.variant]);

  switch (props.variant) {
    case "h1":
      return <h1 {...props} className={classNames(classes, props.className)} />;
    case "h2":
      return <h2 {...props} className={classNames(classes, props.className)} />;
    case "h3":
      return <h3 {...props} className={classNames(classes, props.className)} />;
    case "h4":
      return <h4 {...props} className={classNames(classes, props.className)} />;
    case "h5":
      return <h5 {...props} className={classNames(classes, props.className)} />;
    case "h6":
      return <h6 {...props} className={classNames(classes, props.className)} />;
    case "body1":
      return (
        <span {...props} className={classNames(classes, props.className)} />
      );
    case "body2":
      return (
        <span {...props} className={classNames(classes, props.className)} />
      );
  }
};
