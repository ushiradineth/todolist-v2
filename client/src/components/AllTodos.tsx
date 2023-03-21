import { GET_ALL_TODOS } from "@/util/graphql/todo/query";
import { useQuery } from "@apollo/client";
import React from "react";
import Spinner from "./Spinner";
import Error from "./Error";
import Button from "./Button";
import { Card } from "./styles/Card.styled";

export default function AllTodos() {
  const { data, loading, error, refetch } = useQuery<{ Todos: Todo[] }>(GET_ALL_TODOS);

  if (loading) return <Spinner noBG />;
  if (error) return <p>{error.message}</p>;
  if (!data?.Todos) return <p>Data not found</p>;

  const todos: Todo[] = data.Todos;

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
        {todos.map((item, index) => (
          <TodoItem key={index} todo={item} />
        ))}
      </div>
      <Button onClick={() => refetch()} text={"Refetch"} disabled={false} />
    </Card>
  );
}

export function TodoItem(props: { todo: Todo }) {
  return (
    <div>
      <p style={{ fontSize: "20px" }}>
        {props.todo.name} - {props.todo._id}
      </p>
      <p style={{ fontSize: "20px" }}>{props.todo.todo}</p>
    </div>
  );
}
