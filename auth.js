import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import Google from "next-auth/providers/google";

// *DO NOT* create a `Pool` here, outside the request handler.

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const googleClientId =
    process.env.NODE_ENV === "production"
      ? process.env.AUTH_GOOGLE_ID_PROD
      : process.env.AUTH_GOOGLE_ID_DEV;


  return {
    adapter: NeonAdapter(pool),
    providers: [
      Google({
        clientId: googleClientId,
        clientSecret:
          process.env.NODE_ENV === "production"
            ? process.env.AUTH_GOOGLE_SECRET_PROD
            : process.env.AUTH_GOOGLE_SECRET_DEV,
      }),
    ],
  };
});
