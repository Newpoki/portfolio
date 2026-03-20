import { useNavigate } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/auth/auth";

export const HeaderLogoutButton = () => {
  const navigate = useNavigate();

  const handleSignout = useCallback(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    });
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
