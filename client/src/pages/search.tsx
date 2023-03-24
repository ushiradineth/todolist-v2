import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { GET_TODO_BY_ID } from "@/util/graphql/todo/query";
import { getClient } from "@/util/apollo-client";
import { TodoItem } from "@/components/AllTodos";
import Error from "@/components/Error";
import { Card } from "@/components/styles/Card.styled";

export default function Search() {
  const [id, setID] = React.useState("");
  const [result, setResult] = React.useState<Todo | null>();
  const [error, setError] = React.useState<string | null>();
  const [loading, setLoading] = React.useState(false);

  if (error) return <Error error={error} />;

  return (
    <>
      <Head>
        <title>Search Todo</title>
      </Head>
      <Card>
        <Title text="Search for a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="ID" type="text" maxlength={50} placeholder="Todo ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)} />
          <Button loading={loading} text="Search" onClick={() => GetTodo(setResult, setError, setLoading, id)} disabled={id.length === 0} />
        </div>
        {result && <TodoItem todo={result} key={result._id} />}
      </Card>
    </>
  );
}

async function GetTodo(setResult: (value: Todo) => void, setError: (value: string) => void, setLoading: (value: boolean) => void, id: string) {
  const client = getClient();

  try {
    setLoading(true);
    const { data } = await client.query({
      query: GET_TODO_BY_ID,
      variables: { id },
    });

    setResult(data.Todo);
    setLoading(false);
  } catch (e) {
    console.error(e);
    setError("No results found");
    setLoading(false);
  }
}
