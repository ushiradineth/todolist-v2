import React, { useState, useEffect } from "react";
import Head from "next/head.js";
import { Login } from "@/components/auth/Login";
import { Register } from "@/components/auth/Registration";
import { TabbedMenu, TabbedMenuBody, TabbedMenuTabLeft, TabbedMenuTabRight, TabbedMenuTabs } from "@/components/TabbedMenu";

const Auth = () => {
  const [loginMenu, setLoginMenu] = useState(true);

  return (
    <>
      <Head>
        <title>{loginMenu ? "Login" : "Register"}</title>
      </Head>
      <TabbedMenu>
        <TabbedMenuTabs>
          <TabbedMenuTabLeft text={"Login"} state={!loginMenu} onClick={() => setLoginMenu(true)} />
          <TabbedMenuTabRight text={"Register"} state={loginMenu} onClick={() => setLoginMenu(false)} />
        </TabbedMenuTabs>
        <TabbedMenuBody>{loginMenu ? <Login /> : <Register />}</TabbedMenuBody>
      </TabbedMenu>
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
