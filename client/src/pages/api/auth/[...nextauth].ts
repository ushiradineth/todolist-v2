import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import { getClient } from "@/util/apollo-client";
import { AUTHENTICATE_USER } from "@/util/graphql/user/query";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      session.user = {
        id: token.sub,
        email: token.email,
        name: token.name,
      };

      return session;
    },
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = getClient();
        const { data } = await client.query({ query: AUTHENTICATE_USER, variables: { email: credentials?.email, password: credentials?.password } });

        if (!data) {
          return null;
        }

        return {
          id: data.UserAuthentication._id,
          email: data.UserAuthentication.email,
          name: data.UserAuthentication.name,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
