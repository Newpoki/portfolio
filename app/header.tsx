export const Header = () => {
  return (
    <header className="mb-8 flex justify-between py-4 font-semibold">
      <a href="/">Jason Savelli</a>

      <div className="flex gap-8">
        <a href="/projects">Projects</a>
        <a>Experiencies</a>
        <a>About</a>
      </div>
    </header>
  );
};
