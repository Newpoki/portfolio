import { createFileRoute } from "@tanstack/react-router";
import { TabeListItem } from "@/components/ui/table-list-item";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/references")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="mb-8">{m.references_title()}</h1>

      <section>
        <h2 className="mb-12">{m.references_subtitle()}</h2>

        <div className="lg:1/2 mx-auto flex flex-col gap-8 md:w-2/3">
          <p>{m.references_description()}</p>
          <p>{m.references_privacy()}</p>

          <ul>
            <TabeListItem label="Damien Souquieres">
              {m.references_director_of_engineering()}
            </TabeListItem>

            <TabeListItem label="Michaël Haberzettel">
              {m.references_front_end_architect()}
            </TabeListItem>

            <TabeListItem label="Lorenzo Gentilli">
              {m.references_product_manager()}
            </TabeListItem>
          </ul>
        </div>
      </section>
    </div>
  );
}
