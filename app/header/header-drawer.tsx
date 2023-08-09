import { HeaderLink } from "./header-link";
import MenuIcon from "@/public/icons/close.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HeaderDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <menu
      className="fixed left-0 top-0 z-50 m-0 flex h-[100dvh] w-[100dvw] translate-x-[-100dvw] flex-col bg-transparent p-4 backdrop-blur-md transition-transform duration-500"
      // Using style prop instead of className, because otherwise tailwind won't generate this class
      // And I don't want to use safeList class https://tailwindcss.com/docs/content-configuration#safelisting-classes
      style={isOpen ? { transform: "translateX(0)" } : undefined}
    >
      <button className="flex self-start" onClick={onClose}>
        <MenuIcon width={24} />
      </button>

      <ul className="flex flex-1 flex-col justify-center gap-6 ">
        <li className="self-start">
          <HeaderLink href="/" onClick={onClose}>
            home
          </HeaderLink>
        </li>
        <li className="self-start">
          <HeaderLink href="/projects" onClick={onClose}>
            projects
          </HeaderLink>
        </li>
        <li className="self-start">
          <HeaderLink href="/experiencies" onClick={onClose}>
            experiencies
          </HeaderLink>
        </li>
        <li className="self-start">
          <HeaderLink href="/about" onClick={onClose}>
            about
          </HeaderLink>
        </li>
      </ul>
    </menu>
  );
};
