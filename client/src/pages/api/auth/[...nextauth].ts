import { getClient } from "@/util/apollo-client";
import { USER } from "@/util/graphql/user/query";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";

interface User {
  _id: string;
  name: string;
  email: string;
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
}

async function refreshAccessToken(user: any, refreshToken: string): Promise<User> {
  const payload = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_KEYCLOAK_ID as string,
    client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_SECRET as string,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: payload,
  });

  const refreshedTokens = await response.json();

  const client = getClient(refreshedTokens.access_token);

  await client.query({ query: USER });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: refreshedTokens.expires_in,
    refreshToken: refreshedTokens.refresh_token,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: process.env.KEYCLOAK_AUTHORIZATION,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      let jwt: JWT;

      if (user && account) {
        jwt = {
          _id: user.id,
          token: user.id,
          name: user.name,
          email: user.email,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
        };
      } else {
        const res = await refreshAccessToken(token, token.refreshToken as string);
        jwt = {
          _id: res._id,
          token: res._id,
          name: res.name,
          email: res.email,
          accessToken: res.accessToken,
          accessTokenExpires: res.accessTokenExpires,
          refreshToken: res.refreshToken,
        };
      }

      return jwt;
    },
    async session({ token, session }) {
      session.user = {
        _id: token._id as string,
        name: token.name as string,
        email: token.email as string,
        accessToken: token.accessToken as string,
        accessTokenExpires: (token.accessTokenExpires || "").toString(),
        refreshToken: token.refreshToken as string,
      };

      return session;
    },
  },
};

export default NextAuth(authOptions);
