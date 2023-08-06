import classNames from "classnames";

type IRevealButton = {
  children: React.ReactNode;
  hidden: React.ReactNode;
  size?: "small" | "normal";
};

export const RevealButton = ({ children, hidden, size }: IRevealButton) => {
  return (
    <button
      type="button"
      className={classNames(
        "group relative items-center overflow-hidden rounded-3xl border-2 border-black font-semibold",
        {
          "px-8 py-3": size === "normal",
          "px-5 py-2": size === "small",
          "px-8 py-3 lg:px-5 lg:py-2": size == null,
        }
      )}
    >
      {children}
      <span
        className={classNames(
          "absolute left-0 right-0 top-0 flex h-full translate-y-12 items-center whitespace-nowrap bg-black text-white transition-transform group-hover:translate-y-0",
          {
            "px-8 py-3": size === "normal",
            "px-5 py-2": size === "small",
            "px-8 py-3 lg:px-5 lg:py-2": size == null,
          }
        )}
      >
        {hidden}
      </span>
    </button>
  );
};
