import { publicURLs } from "@/util/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomeButton from "./HomeButton";
import Spinner from "./Spinner";
import { Container } from "./styles/Container.styled";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated" && !publicURLs.includes(router.pathname)) router.push("/auth");

  return (
    <Container>
      {router.pathname !== "/" && <HomeButton />}
      {children}
    </Container>
  );
};
