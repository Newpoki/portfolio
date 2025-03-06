"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { githubSignin } from "./signin-actions";
import { useTranslations } from "next-intl";

type SigninGithubButtonProps = {
  className?: string;
};

export const SigninGithubButton = ({ className }: SigninGithubButtonProps) => {
  const t = useTranslations("SIGNIN");

  const handleClick = useCallback(async () => {
    await githubSignin();
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
