import { Link, useRouteContext } from "@tanstack/react-router";
import { CircleUserIcon } from "lucide-react";
import { HeaderLogoutButton } from "./header-logout-button";
import { Button } from "@/components/ui/button";

export const HeaderProfile = () => {
  const { session } = useRouteContext({ from: "__root__" });

  return (
    <>
      <Link to={session?.user == null ? "/login" : "/admin"}>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="rounded-full"
        >
          {session?.user.image != null ? (
            <img
              src={session.user.image}
              width={24}
              height={24}
              className="rounded-full"
              alt="User profile picture"
            />
          ) : (
            <CircleUserIcon />
          )}
        </Button>
      </Link>

      {session?.user != null && <HeaderLogoutButton />}
    </>
  );
};

// TODO: Remove use client directives
