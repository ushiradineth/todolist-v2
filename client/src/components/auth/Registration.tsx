import { CREATE_USER } from "@/util/graphql/user/mutation";
import toast from "@/util/Toast";
import { useMutation } from "@apollo/client";
import Button from "../Button";
import Input from "../Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { emailValidator, nameValidator, passwordValidator } from "@/util/validators";
import { FormEvent, useState } from "react";
import { StyledForm } from "../styles/Form.styled";

export const Register = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER, { onError: (e) => toast(e.networkError ? "Error creating User." : "User already exists.", "error"), onCompleted: () => toast("User created!", "success") });

  const { register, watch } = useForm<InputType>({ resolver: yupResolver(schema) });
  const formData = watch();
  const [error, setError] = useState("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        setError("");
        createUser({ variables: data });
      })
      .catch((err) => error !== err && setError(err.message.toUpperCase()));
  };

  return (
    <StyledForm onSubmit={(e) => submitHandler(e)}>
      <Input id="name" type="text" placeholder="Name" register={register("name")} />
      <Input id="email" type="email" placeholder="Email" register={register("email")} />
      <Input id="password" type="password" placeholder="Password" register={register("password")} />
      {/* <PasswordLog password={formData.password || ""} /> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button loading={loading} text={"Register"} />
    </StyledForm>
  );
};

type InputType = {
  email: string;
  name: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    password: passwordValidator,
    email: emailValidator,
    name: nameValidator,
  })
  .required();
