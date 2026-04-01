import { useNavigate } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/ui/button";
import { authClient } from "@/auth/auth";

export const HeaderLogoutButton = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await navigate({ to: "/" });
        },
      },
    });
  };

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
