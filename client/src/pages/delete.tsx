import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "@/util/graphql/todo/mutation";
import toast from "@/util/Toast";
import { Card } from "@/components/styles/Card.styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { idValidator } from "@/util/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@/components/styles/Form.styled";

export default function Delete() {
  const [error, setError] = useState("");
  const [deleteTodo, { loading }] = useMutation(DELETE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Todo does not exist", "error")),
    onCompleted: () => toast("Deleted Todo", "success"),
  });
  const { register, watch } = useForm<InputType>({ resolver: yupResolver(schema) });
  const formData = watch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        setError("");
        deleteTodo({ variables: data });
      })
      .catch((err) => error !== err && setError(err.message.toUpperCase()));
  };

  return (
    <>
      <Head>
        <title>Delete Todo</title>
      </Head>
      <Card>
        <StyledForm onSubmit={(e) => submitHandler(e)}>
          <Title text="Delete a todo!" />
          <Input id="id" type="text" placeholder="Todo ID" register={register("id")} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button loading={loading} text={"Submit"} />
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
