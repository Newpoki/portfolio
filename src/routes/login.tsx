import { createFileRoute, redirect } from "@tanstack/react-router";
import { TerminalIcon } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/auth/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({ to: "/admin" });
    }
  },
  head: () => ({
    meta: seo({
      title: m.login_metadata_title(),
      description: m.login_metadata_description(),
    }),
  }),
});

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // We don't have to set is back to false after login,
    // because after the promise is done, we're still not login yet
    // But we'll be redirected to another page anyway
    // Catch is meaning less as the error happens outside of the app
    // And we don't know about it
    setIsLoading(true);

    authClient.signIn.social({
      provider: "github",
      callbackURL: "/admin",
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-8">
      <h1>{m.login_title()}</h1>

      <Alert className="w-fit">
        <TerminalIcon className="h-4 w-4" />
        <AlertTitle>{m.login_alert_title()}</AlertTitle>
        <AlertDescription>{m.login_alert_description()}</AlertDescription>
      </Alert>

      <Button
        variant="secondary"
        onClick={handleLogin}
        type="button"
        disabled={isLoading}
        className="mt-auto md:mt-0 md:w-fit"
      >
        {m.login_github_button()}
      </Button>
    </div>
  );
}
