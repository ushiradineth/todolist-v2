import toast from "@/util/Toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailValidator, passwordValidator } from "@/util/validators";
import { StyledForm } from "../styles/Form.styled";

export const Login = () => {
  const { register, watch } = useForm<InputType>({ resolver: yupResolver(schema) });
  const formData = watch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData)
      .then(async (data) => {
        setError("");
        setLoading(true);
        const login = await signIn("credentials", { email: data.email, password: data.password, callbackUrl: "/", redirect: false });
        login?.status === 401 ? toast("Invalid Credentials", "warning") : login?.error && toast(login?.error, "error");
        setLoading(false);
        login?.ok && router.push("/");
      })
      .catch((err) => error !== err && setError(err.message.toUpperCase()));
  };

  return (
    <StyledForm onSubmit={(e) => submitHandler(e)}>
      <Input id="email" type="email" placeholder="Email" register={register("email")} />
      <Input id="password" type="password" placeholder="Password" register={register("password")} />
      {/* <PasswordLog password={formData.password || "error"} /> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button loading={loading} text={"Login"} />
    </StyledForm>
  );
};

type InputType = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    password: passwordValidator,
    email: emailValidator,
  })
  .required();
