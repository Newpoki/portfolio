import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jason Savelli - Home",
  description: "The home page",
};

export default function Home() {
  return (
    <main>
      <h1 className="flex flex-col mb-8">
        <span className="text-9xl font-bold uppercase">Jason Savelli</span>
        <span className="text-9xl font-bold uppercase">Front End developper</span>
      </h1>

      <h2 className="text-2xl font-semibold">I enjoy working on React projects with TypeScript</h2>
    </main>
  );
}
