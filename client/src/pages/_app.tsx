import type { AppProps } from "next/app";
import GlobalStyled from "@/util/StyledComponents/Global.styled";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/components/Layout";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <GlobalStyled />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer pauseOnFocusLoss={false} newestOnTop />
    </SessionProvider>
  );
}
