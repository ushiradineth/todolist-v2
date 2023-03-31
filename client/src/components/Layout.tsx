import { getClient } from "@/util/apollo-client";
import { publicURLs } from "@/util/constants";
import { ApolloProvider } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomeButton from "./HomeButton";
import Spinner from "./Spinner";
import { Container } from "./styles/Container.styled";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated" && !publicURLs.includes(router.pathname)) router.push("/auth");
  if (status === "authenticated") router.push("/");

  return (
    <ApolloProvider client={getClient(session?.token)}>
      <Container>
        {router.pathname !== "/" && <HomeButton />}
        {children}
      </Container>
    </ApolloProvider>
  );
};
