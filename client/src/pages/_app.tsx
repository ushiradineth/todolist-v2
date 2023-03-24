import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { getClient } from "@/util/apollo-client";
import GlobalStyled from "@/util/StyledComponents/Global.styled";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/components/Layout";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = getClient();

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <GlobalStyled />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer pauseOnFocusLoss={false} newestOnTop />
      </ApolloProvider>
    </SessionProvider>
  );
}
