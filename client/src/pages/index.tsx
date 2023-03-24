import AllTodos from "@/components/AllTodos";
import Button from "@/components/Button";
import { Card } from "@/components/styles/Card.styled";
import { Container } from "@/components/styles/Container.styled";
import { StyledLink } from "@/components/styles/Link.styled";
import Title from "@/components/Title";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
      </Head>
      <div style={{ display: "flex", backgroundColor: "#18181b" }}>
        <Actions />
        <Card>
          <Title text="All todos!" />
          <AllTodos />
        </Card>
      </div>
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
  const { data: session } = useSession();

  return (
    <Card>
      <p>{session?.user.email}</p>
      <Button onClick={() => signOut()} text={"Sign Out"} disabled={false} />
      <Button onClick={() => signIn()} text={"Sign In"} disabled={false} />
    </Card>
  );
}
