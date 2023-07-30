import classNames from "classnames";
import { useMemo } from "react";

type TypographyH1 = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: "h1";
};

type TypographyH2 = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: "h2";
};

type TypographyH3 = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: "h3";
};

type TypographyH4 = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: "h4";
};

type TypographyH5 = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: "h5";
};

type TypographyH6 = React.HTMLAttributes<HTMLHeadingElement> & {
  variant: "h6";
};

type TypographyBody1 = React.HTMLAttributes<HTMLSpanElement> & {
  variant: "body1";
};

type TypographyBody2 = React.HTMLAttributes<HTMLSpanElement> & {
  variant: "body2";
};

type Props =
  | TypographyH1
  | TypographyH2
  | TypographyH3
  | TypographyH4
  | TypographyH5
  | TypographyH6
  | TypographyBody1
  | TypographyBody2;

export const Typography = ({
  className,
  variant = "body1",
  ...props
}: Props) => {
  const classes = useMemo(() => {
    switch (variant) {
      case "h1":
        return "text-2xl sm:text-3xl lg:text-5xl font-bold uppercase xl:text-7xl 2xl:text-8xl";
      case "h2":
        return "text-md sm:text-lg lg:text-xl font-semibold xl:text-2xl";
    }
  }, [variant]);

  switch (variant) {
    case "h1":
      return <h1 {...props} className={classNames(classes, className)} />;
    case "h2":
      return <h2 {...props} className={classNames(classes, className)} />;
    case "h3":
      return <h3 {...props} className={classNames(classes, className)} />;
    case "h4":
      return <h4 {...props} className={classNames(classes, className)} />;
    case "h5":
      return <h5 {...props} className={classNames(classes, className)} />;
    case "h6":
      return <h6 {...props} className={classNames(classes, className)} />;
    case "body1":
      return <span {...props} className={classNames(classes, className)} />;
    case "body2":
      return <span {...props} className={classNames(classes, className)} />;
  }
};
