import Head from "next/head";
import { getAllTodos } from "@/util/graphql/query";
import { useQuery } from "@apollo/client";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";

export default function Home() {
  const { loading, error, data } = useQuery(getAllTodos);

  if (loading) return <Spinner />;
  if (error) return <Error error={error.message} />;

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
