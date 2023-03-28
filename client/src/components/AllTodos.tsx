import { GET_ALL_TODOS_BY_USER } from "@/util/graphql/todo/query";
import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useEffect, useState } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import { Card } from "./styles/Card.styled";
import { DELETE_TODO, UPDATE_TODO } from "@/util/graphql/todo/mutation";
import toast from "@/util/Toast";
import { AiOutlineClose } from "react-icons/ai";
import Input from "./Input";
import { IoMdSend } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { textValidator } from "@/util/validators";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export default function AllTodos() {
  const { data, loading, error, refetch } = useQuery<{ UserTodos: Todo[] }>(GET_ALL_TODOS_BY_USER);

  if (loading) return <Spinner noBG />;
  if (error) return <p>{error.message}</p>;
  if (!data?.UserTodos) return <p>Data not found</p>;

  const todos: Todo[] = data.UserTodos;

  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        {todos.map((item, index) => (
          <TodoItem key={index} todo={item} refetch={refetch} />
        ))}
        {todos.length === 0 && <p>No todos.</p>}
      </div>
    </Card>
  );
}

export function TodoItem(props: { todo: Todo; refetch: () => any }) {
  const { register, watch } = useForm<{ text: string }>({ resolver: yupResolver(schema) });
  const formData = watch();
  const [edit, setEdit] = useState(false);
  const [deleteTodo, { loading: loadingDelete }] = useMutation(DELETE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Todo does not exist", "error")),
    onCompleted: () => {
      props.refetch();
    },
  });

  const [updateTodo, { loading: loadingUpdate }] = useMutation(UPDATE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Todo does not exist", "error")),
    onCompleted: () => {
      props.refetch();
      setEdit(false);
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        updateTodo({ variables: { id: props.todo._id, todo: data.text } });
      })
      .catch();
  };

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      {edit ? (
        <form onSubmit={(e) => submitHandler(e)} style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
          <Input
            id="text"
            type="text"
            placeholder="text"
            style={{ width: 200 }}
            cStyle={{ marginTop: 8 }}
            register={register("text")}
            defaultValue={props.todo.todo}
            action={
              <button type="button" style={{ all: "unset", fontSize: 20, marginTop: 6, cursor: "pointer" }} onClick={() => setEdit(false)}>
                <AiOutlineClose color="white" />
              </button>
            }
          />
          <Button text={<IoMdSend />} loading={loadingUpdate} />
        </form>
      ) : (
        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" style={{ all: "unset", fontSize: 20, marginTop: 6, cursor: "pointer" }} onClick={() => deleteTodo({ variables: { id: props.todo._id } })}>
            {loadingDelete ? <Spinner noBG /> : <AiOutlineClose />}
          </button>
          <button type="button" style={{ all: "unset", fontSize: 20, cursor: "pointer" }} onClick={() => setEdit(!edit)}>
            {props.todo.todo}
          </button>
        </div>
      )}
    </div>
  );
}

const schema = yup
  .object()
  .shape({
    text: textValidator,
  })
  .required();
