import { createFileRoute } from "@tanstack/react-router";
import { ParaglideMessage } from "@inlang/paraglide-js-react";
import { m } from "@/paraglide/messages";
import { Link } from "@/components/ui/link";
import { TabeListItem } from "@/components/ui/table-list-item";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  head: () => ({
    meta: seo({
      title: m.about_metadata_title(),
      description: m.about_metadata_description(),
    }),
  }),
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex max-h-[calc(100dvh-var(--header-h)-var(--header-m-b))] flex-col gap-8 xl:pb-10">
        <h1 dangerouslySetInnerHTML={{ __html: m.about_title() }} />

        <h2>{m.about_subtitle()}</h2>

        <img
          src="/about/me.png"
          alt={m.about_about_me_picture_alt()}
          className="h-full min-h-full w-full rounded-lg object-cover"
        />
      </div>

      <section className="flex flex-col gap-8 lg:gap-20 xl:gap-40">
        <section className="mx-auto flex flex-col gap-8 md:w-2/3 lg:w-1/2">
          <h2>{m.about_who_am_i_title()}</h2>

          <p>{m.about_who_am_i_content()}</p>

          <h2>{m.about_how_did_i_get_there_title()}</h2>

          <p>
            <ParaglideMessage
              message={m.about_how_did_i_get_there_content}
              inputs={{}}
              markup={{
                link: ({ children, options }) => (
                  <Link
                    className="inline-flex font-semibold"
                    type="external"
                    href={options.to}
                  >
                    {children}
                  </Link>
                ),
              }}
            />
          </p>

          <h2>{m.about_dream_stack_title()}</h2>
          <ul>
            <TabeListItem label={m.about_dream_stack_tools_front_title()}>
              {m.about_dream_stack_tools_front_content()}
            </TabeListItem>

            <TabeListItem label={m.about_dream_stack_component_title()}>
              {m.about_dream_stack_component_content()}
            </TabeListItem>

            <TabeListItem label={m.about_dream_stack_data_title()}>
              {m.about_dream_stack_data_content()}
            </TabeListItem>

            <TabeListItem label={m.about_dream_stack_state_title()}>
              {m.about_dream_stack_state_content()}
            </TabeListItem>

            <TabeListItem label={m.about_dream_stack_date_title()}>
              {m.about_dream_stack_date_content()}
            </TabeListItem>

            <TabeListItem label={m.about_dream_stack_unit_tests_title()}>
              {m.about_dream_stack_unit_tests_content()}
            </TabeListItem>

            <TabeListItem label={m.about_dream_stack_integration_tests_title()}>
              {m.about_dream_stack_integration_tests_content()}
            </TabeListItem>
          </ul>
        </section>

        <section className="flex flex-col gap-8 lg:gap-20">
          <h2 className="lg:1/2 mx-auto md:w-2/3">{m.about_outside()}</h2>

          <div className="relative grid gap-4 lg:grid-cols-3 lg:overflow-hidden lg:rounded-xl">
            <img
              src="/about/nouchka-redux.webp"
              alt={m.about_dogs_picture_alt()}
              className="h-full w-full rounded-xl object-cover lg:rounded-none"
            />

            <video
              // Using mp4 instead of webm because iOS doesn't support it yet
              src="/about/guitar.mp4"
              // min-h-full and w-full required because otherwise object-cover won't work in iOS
              className="h-full min-h-full w-full rounded-xl object-cover lg:rounded-none"
              autoPlay
              loop
              muted
              // https://webkit.org/blog/6784/new-video-policies-for-ios/ Needed for iOS video to autoplay
              playsInline
            />

            <img
              src="/about/me-and-friends.webp"
              alt={m.about_me_and_my_friends_alt()}
              className="h-full w-full rounded-xl object-cover lg:rounded-none"
            />
          </div>
        </section>
      </section>
    </div>
  );
}
