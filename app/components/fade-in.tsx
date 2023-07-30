import classNames from "classnames";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const FadeIn = ({ className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={classNames(
        // Have to specify opacity 0 because animation delay may be added
        "animate-[opacity_0.3s_ease-in-out_forwards] opacity-0",
        className
      )}
    />
  );
};
