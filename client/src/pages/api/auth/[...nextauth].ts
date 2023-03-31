import NextAuth, { type Session, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from "next-auth/providers/keycloak";
import { getClient } from "@/util/apollo-client";
import { AUTHENTICATE_USER } from "@/util/graphql/user/query";
import { type JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session(params: { session: Session; token: JWT }) {
      const encodedToken = jsonwebtoken.sign(params.token, process.env.NEXTAUTH_SECRET || "");
      params.session.token = encodedToken;

      return params.session;
    },
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: process.env.KEYCLOAK_AUTHORIZATION,
      wellKnown: `${process.env.KEYCLOAK_ISSUER}/.well-known/openid-configuration`,
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
