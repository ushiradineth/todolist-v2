"use client"

import { getAllTodos } from "@/util/graphql/query";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Error from "./Error";
import Spinner from "./Spinner";

export default function Todos() {
  const { data, loading, error } = useQuery(getAllTodos);

  // if (loading) return <Spinner />;
  // if (error) return <Error error={error.message} />;
  console.log(data, loading, error);

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
