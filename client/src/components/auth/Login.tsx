import toast from "@/util/Toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import * as yup from "yup";
import { PasswordLog, StyledForm } from "@/pages/auth";

const loginSchema = yup.object({
  email: yup.string().defined().email(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(/(?=.*[A-Z])/, "Password must have atleast one Uppercase Letter")
    .matches(/(?=.*[0-9])/, "Password must have atleast one Number")
    .matches(/(?=.*[!@#\$%\^&\*])/, "Password must have atleast one Special Character"),
});

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const router = useRouter();

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
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 characters minimum.")
      .max(20, "Password is too long - should be 20 characters maximum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(/(?=.*[A-Z])/, "Password must have atleast one Uppercase Letter")
      .matches(/(?=.*[0-9])/, "Password must have atleast one Number")
      .matches(/(?=.*[!@#\$%\^&\*])/, "Password must have atleast one Special Character")
      .validate(password)
      .then(() => !passwordValidation && setPasswordValidation(true))
      .catch(() => passwordValidation && setPasswordValidation(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const onLogin = async () => {
    const login = await signIn("credentials", { email, password, callbackUrl: "/", redirect: false });
    login?.status === 401 ? toast("Invalid Credentials", "warning") : login?.error && toast(login?.error, "error");
    login?.ok && router.push("/");
  };

  return (
    <StyledForm>
      <Input id="email" placeholder="Email" type="Email" onChange={(e) => setEmail(e.currentTarget.value)} />
      <Input id="password" placeholder="Password" type="Password" minlength={8} maxlength={20} onChange={(e) => setPassword(e.currentTarget.value)} />
      <PasswordLog password={password} />
      <Button disabled={!emailValidation || !passwordValidation} text={"Login"} onClick={() => onLogin()} />
    </StyledForm>
  );
};
