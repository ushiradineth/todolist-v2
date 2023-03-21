import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { getClient } from "@/util/apollo-client";
import GlobalStyled from "@/util/StyledComponents/Global.styled";

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient();

  return (
    <ApolloProvider client={client}>
      <GlobalStyled />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
