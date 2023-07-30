import classNames from "classnames";

type Props = React.HTMLAttributes<HTMLDivElement>;

// Have to specify opacity 0 because animation delay may be added
export const fadeInAnimationClassname =
  "animate-[opacity_0.3s_ease-in-out_forwards] opacity-0";

export const FadeIn = ({ className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={classNames(fadeInAnimationClassname, className)}
    />
  );
};
