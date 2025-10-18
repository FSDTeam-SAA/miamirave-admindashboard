import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      userId?: string;
      email?: string | null;
      name?: string | null;
    };

    accessToken?: string;
    refreshToken?: string;
    message?: string;
    success?: boolean;
    statusCode?: number;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    email?: string;
    message?: string;
    success?: boolean;
    statusCode?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    email?: string;
    message?: string;
    success?: boolean;
    statusCode?: number;
  }
}
