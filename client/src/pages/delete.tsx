import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "@/util/graphql/todo/mutation";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import { Layout } from "@/components/Layout";
import toast from "@/util/Toast";

export default function Create() {
  const [id, setID] = React.useState("");

  const [deleteTodo, { data, loading, error }] = useMutation(DELETE_TODO, {
    onError: (e) => <Error error={e.message} />,
    onCompleted: () => toast("Deleted Todo", "success"),
  });

  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

  return (
    <>
      <Head>
        <title>Delete Todo</title>
      </Head>
      <>
        <Title text="Delete a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="ID" type="text" maxlength={50} placeholder="Todo ID" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(e.target.value)} />
          <Button text="Submit" onClick={() => deleteTodo({ variables: { id } })} disabled={id.length === 0} />
        </div>
      </>
    </>
  );
}
