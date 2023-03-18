import Head from "next/head";
import { getAllTodos } from "@/util/graphql/query";
import { getClient } from "@/util/apollo-client";

export const getServerSideProps = async () => {
  const client = getClient();
  const { data } = await client.query({ query: getAllTodos });

  return {
    props: {
      data,
    },
  };
};

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
        <meta name="description" content="NestJS API Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{JSON.stringify(data)}</main>
    </>
  );
}
