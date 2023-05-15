import AllTodos from "@/components/AllTodos";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/styles/Card.styled";
import { StyledLink } from "@/components/styles/Link.styled";
import Title from "@/components/Title";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const { status } = useSession();

  if (status !== "authenticated") return <Spinner />;

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
      <p>{session?.user?.email}</p>
      <Button onClick={() => signOut()} text={"Sign Out"} disabled={false} />
    </Card>
  );
}
