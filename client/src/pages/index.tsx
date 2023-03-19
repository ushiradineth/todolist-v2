import AllTodos from "@/components/AllTodos";
import { Card } from "@/components/styles/Card.styled";
import { Container } from "@/components/styles/Container.styled";
import { StyledLink } from "@/components/styles/Link.styled";
import Title from "@/components/Title";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
        <meta name="description" content="NestJS API Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <Title text="All todos!" />
          <AllTodos />
          <Actions />
        </Card>
      </Container>
    </>
  );
}

function Actions() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledLink href={"/create"}>Create a Todo</StyledLink>
      <StyledLink href={"/update"}>Update a Todo</StyledLink>
      <StyledLink href={"/delete"}>Delete a Todo</StyledLink>
      <StyledLink href={"/search"}>Search for a Todo</StyledLink>
    </div>
  );
}
