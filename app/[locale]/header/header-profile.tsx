import { Button } from "@/components/ui/button";
import { Link } from "../i18n/navigation";
import { CircleUserIcon } from "lucide-react";
import { auth } from "@/auth";
import Image from "next/image";
import { HeaderLogoutButton } from "./header-logout-button";

export const HeaderProfile = async () => {
  const session = await auth();

  return (
    <>
      <Link href={{ pathname: "/login" }}>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          className="rounded-full"
        >
          {session?.user?.image != null ? (
            <Image
              src={session.user?.image}
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

      {session != null && <HeaderLogoutButton />}
    </>
  );
};
