import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

export default async function RootNotFound() {
  const t = await getTranslations("NOT_FOUND");

  return (
    <div className="flex flex-1 items-center justify-center">
      {/* Using grid instead of flex because Separator doesnt work within flex parent with item center */}
      <div className="grid auto-cols-max grid-flow-col items-center gap-4">
        <h2>{t("code")}</h2>

        <Separator orientation="vertical" />
        <span>{t("content")}</span>
      </div>
    </div>
  );
}
