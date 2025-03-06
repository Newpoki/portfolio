import { LoginGithubButton } from "./login-github-button";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TerminalIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const session = await auth();
  const t = await getTranslations("SIGNIN");

  if (session != null) {
    redirect("/en/admin");
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      <h1>{t("title")}</h1>

      <Alert className="w-fit">
        <TerminalIcon className="h-4 w-4" />
        <AlertTitle>{t("alert.title")}</AlertTitle>
        <AlertDescription>{t("alert.description")}</AlertDescription>
      </Alert>

      <LoginGithubButton className="mt-auto md:mt-0 md:w-fit" />
    </div>
  );
}
