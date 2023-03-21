import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";
import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";

type User = {
  [key: string]: any;
  name: string;
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.API_URL,
  }),
  cache: new InMemoryCache(),
});

const GET_USER_BY_EMAIL = gql`
  query ($email: String!) {
    UserByEmail(UserInput: $email) {
      _id
      email
      name
      password
    }
  }
`;

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
        const { data } = await client.query({ query: GET_USER_BY_EMAIL, variables: { email: "ushiradineth@gmail.com" } });

        if (!data || !credentials?.email || !credentials?.password) {
          return null;
        }

        // const isValidPassword = await verify(data.password, credentials.password);

        // if (!isValidPassword) {
        //   return null;
        // }

        if (data.UserByEmail.password !== credentials.password) {
          return null;
        }

        return {
          id: data.UserByEmail._id,
          email: data.UserByEmail.email,
          name: data.UserByEmail.name,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
