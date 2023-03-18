import Head from "next/head";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: monospace;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #18181b;
  font-size: 36px;
  color: white;
`;

const Error = (props: { error: string }) => {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="NestJS API Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>{props.error}</StyledContainer>
    </>
  );
};

export default Error;
