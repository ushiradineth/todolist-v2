import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "@/util/Toast";
import { Card } from "@/components/styles/Card.styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { idValidator, textValidator } from "@/util/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@/components/styles/Form.styled";
import { UPDATE_TODO } from "@/util/graphql/todo/mutation";

export default function Update() {
  const [error, setError] = useState("");
  const [updateTodo, { loading }] = useMutation(UPDATE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Todo does not exist", "error")),
    onCompleted: () => toast("Updated Todo", "success"),
  });
  const { register, watch } = useForm<InputType>({ resolver: yupResolver(schema) });
  const formData = watch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        setError("");
        updateTodo({ variables: { id: data.id, todo: data.text } });
      })
      .catch((err) => error !== err && setError(err.message.toUpperCase()));
  };

  return (
    <>
      <Head>
        <title>Update Todo</title>
      </Head>
      <Card>
        <StyledForm onSubmit={(e) => submitHandler(e)}>
          <Title text="Update a todo!" />
          <Input id="id" type="text" placeholder="Todo ID" register={register("id")} />
          <Input id="text" type="text" placeholder="Text" register={register("text")} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button loading={loading} text={"Submit"} />
        </StyledForm>
      </Card>
    </>
  );
}

type InputType = {
  id: string;
  text: string;
};

const schema = yup
  .object()
  .shape({
    text: textValidator,
    id: idValidator,
  })
  .required();
