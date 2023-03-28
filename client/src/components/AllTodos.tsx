import { GET_ALL_TODOS_BY_USER } from "@/util/graphql/todo/query";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import { Card } from "./styles/Card.styled";
import { DELETE_TODO, UPDATE_TODO } from "@/util/graphql/todo/mutation";
import toast from "@/util/Toast";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import Input from "./Input";
import { IoMdSend } from "react-icons/io";

export default function AllTodos() {
  const { data, loading, error, refetch } = useQuery<{ UserTodos: Todo[] }>(GET_ALL_TODOS_BY_USER);

  if (loading) return <Spinner noBG />;
  if (error) return <p>{error.message}</p>;
  if (!data?.UserTodos) return <p>Data not found</p>;

  const todos: Todo[] = data.UserTodos;

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
        {todos.map((item, index) => (
          <TodoItem key={index} todo={item} refetch={refetch} />
        ))}
        {todos.length === 0 && <p>No todos.</p>}
      </div>
      <Button loading={loading} onClick={() => refetch()} text={"Refetch"} disabled={false} />
    </Card>
  );
}

export function TodoItem(props: { todo: Todo; refetch: () => any }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const [deleteTodo, { loading: loadingDelete }] = useMutation(DELETE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Todo does not exist", "error")),
    onCompleted: () => {
      props.refetch();
      toast("Deleted Todo", "success");
    },
  });

  const [updateTodo, { loading: loadingUpdate }] = useMutation(UPDATE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Todo does not exist", "error")),
    onCompleted: () => {
      props.refetch();
      toast("Updated Todo", "success");
      setEdit(false);
    },
  });

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      {edit ? (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
          <Input
            id={props.todo._id}
            style={{ width: 200 }}
            cStyle={{ marginTop: 8 }}
            placeholder={"Text"}
            onChange={(e) => setText(e.target.value)}
            defaultValue={props.todo.todo}
            action={
              <button style={{ all: "unset", fontSize: 20, marginTop: 6, cursor: "pointer" }} onClick={() => setEdit(false)}>
                <AiOutlineClose color="white" />
              </button>
            }
          />
          <Button text={<IoMdSend />} loading={loadingUpdate} onClick={() => updateTodo({ variables: { id: props.todo._id, todo: text } })} />
        </div>
      ) : (
        <>
          <button style={{ all: "unset", fontSize: 20, marginTop: 8, cursor: "pointer" }} onClick={() => setEdit(!edit)}>
            {props.todo.todo}
          </button>
          <Button text={<AiFillDelete />} loading={loadingDelete} onClick={() => deleteTodo({ variables: { id: props.todo._id } })} />
        </>
      )}
    </div>
  );
}
