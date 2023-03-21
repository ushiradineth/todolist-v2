import Head from "next/head";
import styled from "styled-components";
import HomeButton from "./HomeButton";
import { Layout } from "./Layout";

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: monospace;
  align-items: center;
  justify-content: center;
  background-color: #18181b;
  font-size: 24px;
  color: white;
`;

const Error = (props: { error: string }) => {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <>
        <HomeButton />
        <StyledContainer>
          <p style={{ padding: "20px" }}>{props.error}</p>
        </StyledContainer>
      </>
    </>
  );
};

export default Error;
