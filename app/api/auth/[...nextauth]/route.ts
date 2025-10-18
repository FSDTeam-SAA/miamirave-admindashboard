// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";


// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         if (!credentials) return null;

//         // Call your external AMR API for login
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials.email,
//             password: credentials.password,
//           }),
//         });

//         if (!res.ok) {
//           // If API returns an error or non-200 response, login will fail
//           return null;
//         }

//         const json = await res.json();

//         // If login is successful, the API should return json.data
//         if (json && json.success && json.data) {
//           // The object you return here becomes `user` in the `jwt` callback
//           return {
//             id: json.data.userId,
//             email: json.data.email,
//             accessToken: json.data.accessToken,
//             refreshToken: json.data.refreshToken,
//             raw: json.data, // Store the entire data object for later use
//           } as any;
//         }

//         return null;
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt", // Use JWT-based sessions (recommended for serverless)
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },

//   callbacks: {
//     // `jwt` callback runs whenever a token is created or updated
//     async jwt({ token, user }) {
//       // `user` is available only during the initial sign-in
//       if (user) {
//         // Copy custom fields from `user` into the JWT token
//         token.accessToken = (user as any).accessToken;
//         token.refreshToken = (user as any).refreshToken;
//         token.userId = (user as any).id;
//         token.raw = (user as any).raw ?? user;
//       }
//       return token;
//     },

//     // `session` callback controls what is exposed to the client
//     async session({ session, token }) {
//       session.user = session.user || {};
//       session.user.accessToken = (token as any).accessToken;
//       session.user.refreshToken = (token as any).refreshToken;
//       session.user.userId = (token as any).userId;
//       session.user.raw = (token as any).raw;
//       // You can also attach the entire token if needed: session.token = token as any
//       return session;
//     },
//   },

//   // Must be defined in your environment variables
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export { authOptions };
// export default NextAuth(authOptions);




import { authOptions } from "@/lib/authopton";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

