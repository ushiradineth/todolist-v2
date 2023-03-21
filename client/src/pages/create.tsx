import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "@/util/graphql/mutation";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import { Layout } from "@/components/Layout";

export default function Create() {
  const [name, setName] = React.useState("");
  const [todo, setTodo] = React.useState("");

  const [createTodo, { data, loading, error }] = useMutation(CREATE_TODO, {
    onError: (e) => {
      <Error error={e.message} />;
    },
  });

  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

  return (
    <>
      <Head>
        <title>Create Todo</title>
      </Head>
      <Layout>
        <Title text="Create a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="Name" maxlength={50} placeholder="Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          <Input id="Todo" maxlength={200} placeholder="Todo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} />
          <Button text="Submit" onClick={() => createTodo({ variables: { name, todo } })} disabled={name.length === 0 || todo.length === 0} />
        </div>
      </Layout>
    </>
  );
}
