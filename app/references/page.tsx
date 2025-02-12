import { Metadata } from "next";
import { TabeListItem } from "../components/table-list-item";

export const metadata: Metadata = {
  title: "Jason Savelli - References",
  description: "Some references",
};

export default async function References() {
  return (
    <div>
      <h1 className="mb-8">References</h1>

      <section>
        <h2 className="mb-12">People that can tell you more</h2>

        <div className="lg:1/2 mx-auto flex flex-col gap-8 md:w-2/3">
          <p>
            I told you who I am, but sometimes it&apos;s also interesting to let
            other people speak for us. Here&apos;s a list of people I&apos;ve
            work with who would be happy to tell you how it was working with me.
          </p>
          <p>
            I won&apos;t share their contact informations for privacy reasons,
            but feel free to ask me and I&apos;ll be more than happy send your
            their contact.
          </p>

          <ul>
            <TabeListItem label="Damien Souquieres">
              Director en engieneering
            </TabeListItem>
            <TabeListItem label="Michaël Haberzettel">
              Front end Architect
            </TabeListItem>
            <TabeListItem label="Lorenzo Gentilli">
              Product manager
            </TabeListItem>
          </ul>
        </div>
      </section>
    </div>
  );
}
