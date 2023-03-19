import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 3em;
  color: black;
`;

export default function Title(props: { text: string }) {
  return <StyledTitle>{props.text}</StyledTitle>;
}
