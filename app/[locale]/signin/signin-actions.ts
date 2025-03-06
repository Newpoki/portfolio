"use server";

import { signIn } from "@/auth";

export const githubSignin = async () => {
  await signIn("github", {
    redirectTo: "/en/admin",
  });
};
