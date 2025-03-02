import { Separator } from "@/components/ui/separator";

export default function RootNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      {/* Using grid instead of flex because Separator doesnt work within flex parent with item center */}
      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <h2>404</h2>
        <Separator orientation="vertical" />
        <span>This page couldn&apos;t be found 😔</span>
      </div>
    </div>
  );
}
