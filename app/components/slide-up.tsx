import classNames from "classnames";

type Props = React.HTMLAttributes<HTMLDivElement>;

// Have to specify "translate-y-full" because animation delay may be added
export const slideUpAnimationClassname =
  "translate-y-full animate-[slide-up_0.8s_ease-in_forwards]";

export const SlideUp = ({ className, ...props }: Props) => {
  return (
    <div className={classNames("overflow-hidden", className)}>
      <div
        {...props}
        // Have to specify "translate-y-full" because animation delay may be added
        className={slideUpAnimationClassname}
      />
    </div>
  );
};
