import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { GET_TODO_BY_ID } from "@/util/graphql/query";
import { getClient } from "@/util/apollo-client";
import { TodoItem } from "@/components/AllTodos";
import { Layout } from "@/components/Layout";

export default function Search() {
  const [id, setID] = React.useState("");
  const [result, setResult] = React.useState<Todo | null>();

  return (
    <>
      <Head>
        <title>Search Todo</title>
      </Head>
      <Layout>
        <Title text="Search for a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="ID" maxlength={50} placeholder="Todo ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)} />
          <Button text="Search" onClick={() => GetTodo(setResult, id)} disabled={id.length === 0} />
        </div>
        {result && <TodoItem todo={result} key={result._id} />}
      </Layout>
    </>
  );
}

async function GetTodo(setResult: any, id: string) {
  const client = getClient();

  try {
    const { data } = await client.query({
      query: GET_TODO_BY_ID,
      variables: { id },
    });

    setResult(data.Todo);
  } catch (error) {
    console.error(error);
  }
}
