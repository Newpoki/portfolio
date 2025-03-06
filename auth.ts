import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "/[locale]/login",
  },
  callbacks: {
    async signIn({ user }) {
      return user.email === process.env.AUTH_AUTHORIZED_EMAIL;
    },
  },
});
