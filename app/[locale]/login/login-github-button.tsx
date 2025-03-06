"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { githubLogin } from "./login-actions";
import { useTranslations } from "next-intl";

type LoginGithubButtonProps = {
  className?: string;
};

export const LoginGithubButton = ({ className }: LoginGithubButtonProps) => {
  const t = useTranslations("SIGNIN");

  const handleClick = useCallback(async () => {
    await githubLogin();
  }, []);

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      type="button"
      className={className}
    >
      {t("github-signin")}
    </Button>
  );
};
