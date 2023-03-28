import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let client: ApolloClient<any> | null = null;

const authLink = (token?: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

export const getClient = (token?: string) => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: authLink(token).concat(
        createHttpLink({
          uri: process.env.NEXT_PUBLIC_API_URL,
        })
      ),
      cache: new InMemoryCache(),
    });
  }

  return client;
};

export default client;
