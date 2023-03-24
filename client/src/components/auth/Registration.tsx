import { StyledForm, PasswordLog } from "@/pages/auth";
import { CREATE_USER } from "@/util/graphql/user/mutation";
import toast from "@/util/Toast";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import * as yup from "yup";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);
  const [createUser] = useMutation(CREATE_USER, { onError: (e) => toast(e.networkError ? "Error creating User." : "User already exists.", "error"), onCompleted: () => toast("User created!", "success") });

  useEffect(() => {
    yup
      .string()
      .email()
      .validate(email)
      .then(() => !emailValidation && setEmailValidation(true))
      .catch(() => emailValidation && setEmailValidation(false));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    yup
      .string()
      .required("Name password provided.")
      .min(1, "Name is too short - should be atleast 1 character minimum.")
      .max(100, "Name is too long - should be 100 characters maximum.")
      .validate(name)
      .then(() => !nameValidation && setNameValidation(true))
      .catch(() => nameValidation && setNameValidation(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(/(?=.*[A-Z])/, "Password must have atleast one Uppercase Letter")
      .matches(/(?=.*[0-9])/, "Password must have atleast one Number")
      .matches(/(?=.*[!@#\$%\^&\*])/, "Password must have atleast one Special Character")
      .validate(password)
      .then(() => !passwordValidation && setPasswordValidation(true))
      .catch(() => passwordValidation && setPasswordValidation(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <StyledForm>
      <Input type="text" id="name" placeholder="Name" minlength={1} maxlength={100} onChange={(e) => setName(e.currentTarget.value)} />
      <Input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)} />
      <Input type="password" id="password" placeholder="Password" minlength={8} maxlength={20} onChange={(e) => setPassword(e.currentTarget.value)} />
      <PasswordLog password={password} />
      <Button disabled={!emailValidation || !nameValidation || !passwordValidation} text={"Register"} onClick={() => createUser({ variables: { email, name, password } })} />
    </StyledForm>
  );
};
