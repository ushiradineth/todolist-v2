import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Container } from "@/components/styles/Container.styled";
import { Card } from "@/components/styles/Card.styled";

export default function Create() {
  const [name, setName] = React.useState("");
  const [todo, setTodo] = React.useState("");

  const [createTodo, { data, loading, error }] = useMutation(CREATE_TODO);

  React.useEffect(() => {
    console.log(data, loading, error);
  }, [data, loading, error]);

  return (
    <>
      <Head>
        <title>Create Todo</title>
        <meta name="description" content="NestJS API Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <Title text="Create a todo!" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Input id="Name" maxlength={50} placeholder="Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <Input id="Todo" maxlength={200} placeholder="Todo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} />
            <Button text="Submit" onClick={() => createTodo({ variables: { name, todo } })} disabled={name.length === 0 || todo.length === 0} />
          </div>
        </Card>
      </Container>
    </>
  );
}
