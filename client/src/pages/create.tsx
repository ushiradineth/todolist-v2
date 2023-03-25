import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Head from "next/head";
import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "@/util/graphql/todo/mutation";
import toast from "@/util/Toast";
import { useSession } from "next-auth/react";
import { Card } from "@/components/styles/Card.styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { textValidator } from "@/util/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "@/components/styles/Form.styled";

export default function Create() {
  const [error, setError] = useState("");
  const [createTodo, { loading }] = useMutation(CREATE_TODO, {
    onError: (e) => (e.networkError ? toast("Network Error", "error") : toast("Unknown error : " + e.message, "error")),
    onCompleted: () => toast("Created Todo", "success"),
  });
  const { register, watch } = useForm<InputType>({ resolver: yupResolver(schema) });
  const formData = watch();
  const { data: session } = useSession();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        setError("");
        createTodo({ variables: { userID: session?.user.id, todo: data.text } });
      })
      .catch((err) => error !== err && setError(err.message.toUpperCase()));
  };

  return (
    <>
      <Head>
        <title>Create Todo</title>
      </Head>
      <Card>
        <StyledForm onSubmit={(e) => submitHandler(e)}>
          <Title text="Create a todo!" />
          <Input id="text" type="text" placeholder="Text" register={register("text")} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button loading={loading} text={"Submit"} />
        </StyledForm>
      </Card>
    </>
  );
}

type InputType = {
  text: string;
};

const schema = yup
  .object()
  .shape({
    text: textValidator,
  })
  .required();
