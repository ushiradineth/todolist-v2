import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "@/util/apollo-client";
import { AUTHENTICATE_USER } from "@/util/graphql/user/query";

type User = {
  [key: string]: any;
  name: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token as User);
    },
    session({ session, token }) {
      if (token.user) {
        const t = token.user as {
          id: string;
        };

        session.user = {
          id: t.id,
          email: token.email,
          name: token.name,
        };
      }
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
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
