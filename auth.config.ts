import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
    newUser: "/",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnYourTeam = nextUrl.pathname.includes("your-team");
      if (isLoggedIn) {
        return true; // Allow access if logged in
      }

      if (isOnYourTeam) {
        return false; // Block access to /hackathons/your-team for unauthenticated users
      }

      return true; // Allow access to other routes
    },
  },
} satisfies NextAuthConfig;