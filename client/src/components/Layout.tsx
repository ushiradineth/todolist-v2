import { useRouter } from "next/router";
import React from "react";
import HomeButton from "./HomeButton";
import { Card } from "./styles/Card.styled";
import { Container } from "./styles/Container.styled";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  
  return (
    <Container>
      <Card>
        {router.pathname !== "/" && <HomeButton />}
        {children}
      </Card>
    </Container>
  );
};
