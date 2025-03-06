"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useCallback } from "react";
import { signOut } from "next-auth/react";

export const HeaderLogoutButton = () => {
  const handleSignout = useCallback(() => {
    signOut();
  }, []);

  return (
    <Button
      variant="secondary"
      type="button"
      onClick={handleSignout}
      size="icon"
    >
      <LogOutIcon />
    </Button>
  );
};
