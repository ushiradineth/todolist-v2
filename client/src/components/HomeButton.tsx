import { useRouter } from "next/router";
import React from "react";
import { IoMdHome } from "react-icons/io";
import styled from "styled-components";

export default function HomeButton() {
  const router = useRouter();
  return (
    <StyledButton onClick={() => router.push("/")}>
      <IoMdHome />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  inset: 50px 0 0 50px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;

  :hover {
    background-color: #a1a1aa;
  }
`;
