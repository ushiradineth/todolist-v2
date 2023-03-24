import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "@/util/graphql/todo/mutation";
import Error from "@/components/Error";
import toast from "@/util/Toast";
import { Card } from "@/components/styles/Card.styled";

export default function Create() {
  const [id, setID] = React.useState("");

  const [deleteTodo, { data, loading, error }] = useMutation(DELETE_TODO, {
    onError: (e) => <Error error={e.message} />,
    onCompleted: () => toast("Deleted Todo", "success"),
  });

  if (error) return <Error error={error.message} />;

  return (
    <>
      <Head>
        <title>Delete Todo</title>
      </Head>
      <Card>
        <Title text="Delete a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="ID" type="text" maxlength={50} placeholder="Todo ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)} />
          <Button loading={loading} text="Submit" onClick={() => deleteTodo({ variables: { id } })} disabled={id.length === 0} />
        </div>
      </Card>
    </>
  );
}
