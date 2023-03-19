import Link from "next/link";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  margin-top: 8px;
  display: flex;
  padding: 0 15px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border-style: solid;
  background-color: #ffffff;
  height: 40px;
  outline: none;
  text-decoration: none;
  font-family: monospace;
  font-size: large;
  color: black;

  :hover {
    background-color: #a1a1aa;
  }
`;
