import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomeButton from "./HomeButton";
import Spinner from "./Spinner";
import { Card } from "./styles/Card.styled";
import { Container } from "./styles/Container.styled";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  const ignoreLinks = ["/404", "/500", "/auth"];

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated" && !ignoreLinks.includes(router.pathname)) router.push("/auth");

  return (
    <Container>
      <Card>
        {router.pathname !== "/" && <HomeButton />}
        {children}
      </Card>
    </Container>
  );
};
