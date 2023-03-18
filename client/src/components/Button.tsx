import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 8px;
  display: flex;
  width: 50%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #60a5fa;
  height: 40px;
  outline: none;

  :disabled {
    cursor: not-allowed;
    background-color: #a1a1aa;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Button(props: { disabled: boolean; onClick: (arg0: any) => void; text: string }) {
  return (
    <Container>
      <StyledButton disabled={props.disabled} id="Submit" onClick={props.onClick}>
        {props.text}
      </StyledButton>
    </Container>
  );
}
