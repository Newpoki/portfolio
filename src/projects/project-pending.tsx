import { Skeleton } from "@/ui/skeleton";
import { TabeListItem } from "@/ui/table-list-item";
import { m } from "@/i18n/paraglide/messages";

export const ProjectPending = () => {
  return (
    <div className="flex flex-col lg:gap-8">
      <div className="flex h-[calc(100dvh-var(--header-h)-var(--header-m-b))] flex-col gap-8 pb-10">
        <h1 className="flex items-center justify-between">
          <Skeleton className="h-35 w-200" />

          <Skeleton className="h-35 w-100" />
        </h1>

        <section className="flex flex-1 flex-col gap-10 md:gap-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-10 w-120" />

            <span className="font-semibold whitespace-nowrap">
              {m.project_discover()}
            </span>
          </div>

          <Skeleton className="flex w-full flex-1" />
        </section>
      </div>

      <section className="mx-auto flex flex-col justify-center gap-16 md:w-4/5 lg:w-1/2">
        <Skeleton className="h-5 w-200" />

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
