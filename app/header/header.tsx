import { HeaderLink } from "./header-link";

export const Header = () => {
  return (
    <header className="mb-8 flex justify-between py-4 font-semibold">
      <HeaderLink href="/">Jason Savelli</HeaderLink>

      <div className="flex gap-8">
        <HeaderLink href="/projects">projects</HeaderLink>
        <HeaderLink href="/experiencies">experiencies</HeaderLink>
        <HeaderLink href="/about">about</HeaderLink>
      </div>
    </header>
  );
};
