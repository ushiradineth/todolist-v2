import React from "react";
import BackButton from "./BackButton";
import { Card } from "./styles/Card.styled";
import { Container } from "./styles/Container.styled";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>
    <Card>
      <BackButton />
      {children}
    </Card>
  </Container>
);

export default Layout