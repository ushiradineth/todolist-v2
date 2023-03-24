import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "@/util/graphql/todo/mutation";
import Error from "@/components/Error";
import toast from "@/util/Toast";
import { useSession } from "next-auth/react";
import { Card } from "@/components/styles/Card.styled";

export default function Create() {
  const { data: session } = useSession();
  const [todo, setTodo] = React.useState("");

  const [createTodo, { data, loading, error }] = useMutation(CREATE_TODO, {
    onError: (e) => <Error error={e.message} />,
    onCompleted: () => toast("Created Todo", "success"),
  });

  if (error) return <Error error={error.message} />;

  return (
    <>
      <Head>
        <title>Create Todo</title>
      </Head>
      <Card>
        <Title text="Create a todo!" />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Input id="Todo" type={"text"} maxlength={200} placeholder="Todo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} />
          <Button loading={loading} text="Submit" onClick={() => createTodo({ variables: { userID: session?.user.id, todo } })} disabled={todo.length === 0} />
        </div>
      </Card>
    </>
  );
}
