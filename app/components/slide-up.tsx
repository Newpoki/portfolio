import classNames from "classnames";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const SlideUp = ({ className, ...props }: Props) => {
  return (
    <div className={classNames("overflow-hidden", className)}>
      <div
        {...props}
        // Have to specify "translate-y-full" because animation delay may be added
        className="translate-y-full animate-[slide-up_1s_ease-in-out_forwards]"
      />
    </div>
  );
};
