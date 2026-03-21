import { Skeleton } from "@/components/ui/skeleton";
import { m } from "@/paraglide/messages";

export const ProjectsPending = () => {
  return (
    <section>
      <h1 className="mb-8">{m.projects_title()}</h1>

      <div>
        <h2 className="mb-12">{m.projects_subtitle()}</h2>

        <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square" />
          ))}
        </ul>
      </div>
    </section>
  );
};
