import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Head from "next/head.js";
import { z } from "zod";
import { CREATE_USER } from "@/util/graphql/user/mutation";
import { useMutation } from "@apollo/client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styled from "styled-components";
import { useRouter } from "next/router";
import toast from "@/util/Toast";

const Auth = () => {
  const [loginMenu, setLoginMenu] = useState(true);
  const router = useRouter();

  const LoginMenu = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);

    useEffect(() => {
      const EmailVState = z.string().email().safeParse(email);
      if (emailValidation !== EmailVState.success) {
        setEmailValidation(EmailVState.success);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    useEffect(() => {
      const PasswordVState = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/.test(password);
      if (passwordValidation !== PasswordVState) {
        setPasswordValidation(PasswordVState);
      }
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

  const RegisterMenu = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [createUser] = useMutation(CREATE_USER, { onError: (e) => toast(e.networkError ? "Error creating User." : "User already exists.", "error"), onCompleted: () => toast("User created!", "success") });

    useEffect(() => {
      const EmailVState = z.string().email().safeParse(email);

      if (emailValidation !== EmailVState.success) {
        setEmailValidation(EmailVState.success);
      }

      const NameVState = z.string().min(1).max(100).safeParse(name);

      if (nameValidation !== NameVState.success) {
        setNameValidation(NameVState.success);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, name]);

    useEffect(() => {
      const PasswordVState = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/.test(password);
      if (passwordValidation !== PasswordVState) {
        setPasswordValidation(PasswordVState);
      }
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

  return (
    <>
      <Head>
        <title>{loginMenu ? "Login" : "Register"}</title>
      </Head>
      <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
        <StyledDiv>
          <StyledLogin login={!loginMenu} id="LoginBtn" onClick={() => setLoginMenu(true)}>
            Login
          </StyledLogin>
          <StyledRegister login={loginMenu} id="RegisterBtn" onClick={() => setLoginMenu(false)}>
            Register
          </StyledRegister>
        </StyledDiv>
        <section style={{ padding: "8px 24px 24px 24px" }}>{loginMenu ? <LoginMenu /> : <RegisterMenu />}</section>
      </div>
    </>
  );
};

export default Auth;

const PasswordLog = (props: { password: string }) => {
  const [passwordLog, setPasswordLog] = useState<string[]>([]);
  useEffect(() => {
    var errors: string[] = [];
    !/^(?=.*[A-Z])/.test(props.password) && errors.push("Uppercase Character");
    !/^(?=.*[0-9])/.test(props.password) && errors.push("Number");
    !/^(?=.*[!@#\$%\^&\*])/.test(props.password) && errors.push("Special Character");
    !/^(?=.{8,20})/.test(props.password) && errors.push("Minimum 8 Characters");
    setPasswordLog(errors);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.password]);

  return (
    <>
      {passwordLog.length > 0 && (
        <ul>
          {passwordLog.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const StyledForm = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 12px;
  text-align: center;
`;

const StyledDiv = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const StyledLogin = styled.div<{ login: boolean }>`
  display: flex;
  height: 48px;
  width: 100%;
  user-select: none;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${({ login }) =>
    login &&
    `
    border-top-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 4px;
    border-left: 4px;
    background-color: #c2c2c2;
  `}
`;

const StyledRegister = styled.div<{ login: boolean }>`
  display: flex;
  height: 48px;
  width: 100%;
  user-select: none;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  ${({ login }) =>
    login &&
    `
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top: 4px;
    border-right: 4px;
    background-color: #c2c2c2;
  `}
`;
