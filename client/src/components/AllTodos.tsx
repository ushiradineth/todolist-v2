import { GET_ALL_TODOS_BY_USER } from "@/util/graphql/todo/query";
import { useQuery } from "@apollo/client";
import React from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import { Card } from "./styles/Card.styled";
import { useSession } from "next-auth/react";

export default function AllTodos() {
  const { data: session } = useSession();
  const { data, loading, error, refetch } = useQuery<{ UserTodos: Todo[] }>(GET_ALL_TODOS_BY_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    },
  });

  if (loading) return <Spinner noBG />;
  if (error) return <p>{error.message}</p>;
  if (!data?.UserTodos) return <p>Data not found</p>;

  const todos: Todo[] = data.UserTodos;

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
        {todos.map((item, index) => (
          <TodoItem key={index} todo={item} />
        ))}
        {todos.length === 0 && <p>No todos.</p>}
      </div>
      <Button loading={loading} onClick={() => refetch()} text={"Refetch"} disabled={false} />
    </Card>
  );
}

export function TodoItem(props: { todo: Todo }) {
  return (
    <div>
      {/* <p style={{ fontSize: "20px" }}>{props.todo._id}</p> */}
      <p style={{ fontSize: "20px" }}>{props.todo.todo}</p>
    </div>
  );
}
