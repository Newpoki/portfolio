import { Skeleton } from "@/ui/skeleton";
import { TabeListItem } from "@/ui/table-list-item";
import { m } from "@/i18n/paraglide/messages";

export const ProjectPending = () => {
  return (
    <div className="flex flex-col lg:gap-8">
      <div className="flex h-[calc(100dvh-var(--header-h)-var(--header-m-b))] flex-col gap-8 pb-10">
        <h1 className="flex items-center justify-between">
          <Skeleton className="h-9 w-51 md:h-20 md:w-85 2xl:h-35 2xl:w-200" />

          <Skeleton className="h-9 w-25 md:h-20 md:w-58 2xl:h-35 2xl:w-100" />
        </h1>

        <section className="flex min-h-0 flex-1 flex-col gap-10 md:gap-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-7 w-45 md:h-10 md:w-101 2xl:h-10 2xl:w-120" />

            <span className="font-semibold whitespace-nowrap">
              {m.project_discover()}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 justify-center">
            <Skeleton className="aspect-video max-h-full max-w-full" />
          </div>
        </section>
      </div>

      <section className="mx-auto flex w-full flex-col justify-center gap-16 md:w-4/5 lg:w-1/2">
        <Skeleton className="h-21 w-full 2xl:h-5 2xl:w-200" />

        <div className="sm:space-between flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-5 w-50" />
          <Skeleton className="h-5 w-50" />
        </div>

        <ul>
          <TabeListItem label={m.project_deployed_at_title()}>
            <Skeleton className="h-5 w-25" />
          </TabeListItem>

          <TabeListItem label={m.project_bundler()}>
            <Skeleton className="h-5 w-25" />
          </TabeListItem>

          <TabeListItem label={m.project_bundler()}>
            <Skeleton className="h-5 w-25" />
          </TabeListItem>

          <TabeListItem label={m.project_user_interface()}>
            <Skeleton className="h-5 w-25" />
          </TabeListItem>

          <TabeListItem label={m.project_state_management()}>
            <Skeleton className="h-5 w-25" />
          </TabeListItem>
        </ul>
      </section>
    </div>
  );
};
