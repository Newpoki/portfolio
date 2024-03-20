import { HeaderLink } from "./header-link";
import MenuIcon from "@/public/icons/close.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HeaderDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <menu
      className="fixed left-0 top-0 z-50 m-0 flex h-[100dvh] w-[100dvw] translate-x-[-100dvw] flex-col bg-transparent p-4 backdrop-blur-2xl transition-transform duration-500"
      // Using style prop instead of className, because otherwise tailwind won't generate this class
      // And I don't want to use safeList class https://tailwindcss.com/docs/content-configuration#safelisting-classes
      style={isOpen ? { transform: "translateX(0)" } : undefined}
    >
      <button
        className="flex self-start"
        onClick={onClose}
        aria-label="close drawer navigation button"
      >
        <MenuIcon width={24} />
      </button>

      <nav className="flex flex-1 flex-col justify-center gap-6 ">
        <HeaderLink className="self-start" href="/" onClick={onClose}>
          home
        </HeaderLink>
        <HeaderLink className="self-start" href="/projects" onClick={onClose}>
          projects
        </HeaderLink>
        <HeaderLink
          className="self-start"
          href="/experiencies"
          onClick={onClose}
        >
          experiencies
        </HeaderLink>
        <HeaderLink className="self-start" href="/about" onClick={onClose}>
          about
        </HeaderLink>
        <HeaderLink className="self-start" href="/references" onClick={onClose}>
          references
        </HeaderLink>
      </nav>
    </menu>
  );
};
