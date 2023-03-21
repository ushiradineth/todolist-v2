import AllTodos from "@/components/AllTodos";
import Button from "@/components/Button";
import { Layout } from "@/components/Layout";
import { StyledLink } from "@/components/styles/Link.styled";
import Title from "@/components/Title";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
      </Head>
      <Layout>
        <Title text="All todos!" />
        <AllTodos />
        <Actions />
      </Layout>
    </>
  );
}

function Actions() {
  const { data: session, status } = useSession();

  console.log(session);
  
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {status}
      {session?.user.email}
      <StyledLink href={"/create"}>Create a Todo</StyledLink>
      <StyledLink href={"/update"}>Update a Todo</StyledLink>
      <StyledLink href={"/delete"}>Delete a Todo</StyledLink>
      <StyledLink href={"/search"}>Search for a Todo</StyledLink>
      <StyledLink href={"/ssr"}>SSR</StyledLink>
      <Button onClick={() => signIn("credentials")} text={"sign in"} disabled={false} />
      <Button onClick={() => signOut()} text={"sign out"} disabled={false} />
    </div>
  );
}
