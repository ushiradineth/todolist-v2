import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { useMutation } from "@apollo/client";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import { Layout } from "@/components/Layout";
import { UPDATE_TODO } from "@/util/graphql/todo/mutation";

export default function Create() {
  const [id, setID] = React.useState("");
  const [todo, setTodo] = React.useState("");

  const [updateTodo, { data, loading, error }] = useMutation(UPDATE_TODO, {
    onError: (e) => <Error error={e.message} />,
  });

  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

  return (
    <>
      <Head>
        <title>Update Todo</title>
      </Head>
      <Layout>
        <Title text="Update a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="ID" maxlength={50} placeholder="Todo ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)} />
          <Input id="Todo" maxlength={200} placeholder="Todo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} />
          <Button text="Submit" onClick={() => updateTodo({ variables: { id, todo } })} disabled={id.length === 0 || todo.length === 0} />
        </div>
      </Layout>
    </>
  );
}
