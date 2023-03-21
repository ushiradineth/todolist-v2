import AllTodos from "@/components/AllTodos";
import Layout from "@/components/Layout";
import { StyledLink } from "@/components/styles/Link.styled";
import Title from "@/components/Title";
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
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledLink href={"/create"}>Create a Todo</StyledLink>
      <StyledLink href={"/update"}>Update a Todo</StyledLink>
      <StyledLink href={"/delete"}>Delete a Todo</StyledLink>
      <StyledLink href={"/search"}>Search for a Todo</StyledLink>
      <StyledLink href={"/ssr"}>SSR</StyledLink>
    </div>
  );
}
