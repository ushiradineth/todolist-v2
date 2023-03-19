import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { useMutation } from "@apollo/client";
import { Container } from "@/components/styles/Container.styled";
import { Card } from "@/components/styles/Card.styled";
import { DELETE_TODO } from "@/util/graphql/mutation";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import BackButton from "@/components/BackButton";

export default function Create() {
  const [id, setID] = React.useState("");

  const [deleteTodo, { data, loading, error }] = useMutation(DELETE_TODO);

  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

  return (
    <>
      <Head>
        <title>Delete Todo</title>
        <meta name="description" content="NestJS API Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <BackButton />
          <Title text="Delete a todo!" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Input id="ID" maxlength={50} placeholder="Todo ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)} />
            <Button text="Submit" onClick={() => deleteTodo({ variables: { id } })} disabled={id.length === 0} />
          </div>
        </Card>
      </Container>
    </>
  );
}
