import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { Card } from "@/components/styles/Card.styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { idValidator } from "@/util/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@/components/styles/Form.styled";
import { TodoItem } from "@/components/AllTodos";
import { GET_TODO_BY_ID } from "@/util/graphql/todo/query";
import { getClient } from "@/util/apollo-client";

export default function Search() {
  const [error, setError] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<Todo | null>();
  const { register, watch } = useForm<InputType>({ resolver: yupResolver(schema) });
  const formData = watch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        setError("");
        GetTodo(setResult, setError, setLoading, data.id);
      })
      .catch((err) => {
        setResult(null);
        error !== err && setError(err.message.toUpperCase());
      });
  };

  return (
    <>
      <Head>
        <title>Search Todo</title>
      </Head>
      <Card>
        <StyledForm onSubmit={(e) => submitHandler(e)}>
          <Title text="Search for a todo!" />
          <Input id="id" type="text" placeholder="Todo ID" register={register("id")} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button loading={loading} text={"Submit"} />
          {result && <TodoItem todo={result} key={result._id} />}
        </StyledForm>
      </Card>
    </>
  );
}

type InputType = {
  id: string;
};

const schema = yup
  .object()
  .shape({
    id: idValidator,
  })
  .required();

async function GetTodo(setResult: (value: Todo | null) => void, setError: (value: string) => void, setLoading: (value: boolean) => void, id: string) {
  const client = getClient();

  try {
    setLoading(true);
    const { data } = await client.query({
      query: GET_TODO_BY_ID,
      variables: { id },
    });

    setResult(data.Todo);
    setLoading(false);
  } catch (e) {
    setError("No todo found");
    setResult(null);
    setLoading(false);
  }
}
