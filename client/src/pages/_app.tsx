import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { getClient } from "@/util/apollo-client";
import GlobalStyled from "@/util/StyledComponents/Global.styled";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = getClient();

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <GlobalStyled />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
