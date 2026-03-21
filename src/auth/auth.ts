import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/react";
import type { User } from "better-auth";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  redirectTo: "/admin",
});

export const auth = betterAuth({
  emailAndPassword: { enabled: false },
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    },
  },
  plugins: [tanstackStartCookies()],
  databaseHooks: {
    user: {
      create: {
        before: (user): Promise<{ data: User }> => {
          // Only authorize my own GitHub account
          if (user.email !== process.env.AUTH_AUTHORIZED_EMAIL) {
            throw new Error("Unauthorized email");
          }
          return new Promise((resolve) => resolve({ data: user }));
        },
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://jasonsavelli.fr",
    "https://www.jasonsavelli.fr",
  ],
});

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();

    const session = await auth.api.getSession({
      headers,
    });

    return session;
  },
);

export const ensureSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();

    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new Error("Unauthorized");
    }

    return session;
  },
);
