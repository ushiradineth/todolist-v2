import AllTodos from "@/components/AllTodos";
import Button from "@/components/Button";
import { Card } from "@/components/styles/Card.styled";
import { Container } from "@/components/styles/Container.styled";
import { StyledLink } from "@/components/styles/Link.styled";
import Title from "@/components/Title";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
      </Head>
      <Container>
        <Actions />
        <Card>
          <Title text="All todos!" />
          <AllTodos />
        </Card>
      </Container>
    </>
  );
}

function Actions() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card>
        <StyledLink href={"/create"}>Create a Todo</StyledLink>
        <StyledLink href={"/update"}>Update a Todo</StyledLink>
        <StyledLink href={"/delete"}>Delete a Todo</StyledLink>
        <StyledLink href={"/search"}>Search for a Todo</StyledLink>
        <StyledLink href={"/ssr"}>SSR</StyledLink>
      </Card>
      <Profile />
    </div>
  );
}

function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated" && router.pathname !== "/404" && router.pathname !== "/500") router.push("/auth");

  return (
    <Card>
      <p>{session?.user.email}</p>
      <Button onClick={() => signOut()} text={"Sign Out"} disabled={false} />
    </Card>
  );
}
