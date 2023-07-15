type IRevealButton = {
  children: React.ReactNode;
  hidden: React.ReactNode;
};

export const RevealButton = ({ children, hidden }: IRevealButton) => {
  return (
    <button
      type="button"
      className="group relative items-center overflow-hidden rounded-3xl border-2 border-black px-8 py-3 font-semibold"
    >
      {children}
      <span className="absolute left-0 right-0 top-0 flex h-full translate-y-12 items-center whitespace-nowrap bg-black px-8 py-3 text-white transition-transform group-hover:translate-y-0">
        {hidden}
      </span>
    </button>
  );
};
