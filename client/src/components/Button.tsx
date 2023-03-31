import React, { ReactNode } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

interface propType {
  loading?: boolean;
  onClick?: (arg0: any) => void;
  text: string | ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
}

export default function Button(props: propType) {
  return (
    <StyledButton id={typeof props.text === "string" ? props.text : "id"} disabled={props.disabled} type={props.type ? props.type : "submit"} onClick={props.onClick}>
      {props.loading ? <Spinner noBG /> : props.text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  margin-top: 8px;
  display: flex;
  padding: 0 15px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: solid;
  background-color: #ffffff;
  height: 40px;
  outline: none;
  text-decoration: none;
  font-family: monospace;
  font-size: large;
  color: black;

  :disabled {
    cursor: not-allowed;
    background-color: #a1a1aa;
  }

  :hover {
    background-color: #a1a1aa;
  }
`;
