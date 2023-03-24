import React, { useState, useEffect } from "react";
import Head from "next/head.js";
import styled from "styled-components";
import { Login } from "@/components/auth/Login";
import { Register } from "@/components/auth/Registration";

const Auth = () => {
  const [loginMenu, setLoginMenu] = useState(true);

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
        <section style={{ padding: "8px 24px 24px 24px" }}>{loginMenu ? <Login /> : <Register />}</section>
      </div>
    </>
  );
};

export default Auth;

export const PasswordLog = (props: { password: string }) => {
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

export const StyledForm = styled.div`
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
