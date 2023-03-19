import React from "react";
import styled from "styled-components";

export default function Button(props: { disabled: boolean; onClick: (arg0: any) => void; text: string }) {
  return (
    <Container>
      <StyledButton disabled={props.disabled} id="Submit" onClick={props.onClick}>
        {props.text}
      </StyledButton>
    </Container>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
