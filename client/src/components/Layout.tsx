import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomeButton from "./HomeButton";
import { Card } from "./styles/Card.styled";
import { Container } from "./styles/Container.styled";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated" && router.pathname !== "/404" && router.pathname !== "/500") router.push("/auth");

  return (
    <Container>
      <Card>
        {router.pathname !== "/" && <HomeButton />}
        {children}
      </Card>
    </Container>
  );
};
