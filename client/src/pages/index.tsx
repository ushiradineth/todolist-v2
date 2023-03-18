"use client";

import ClientOnly from "@/components/ClientOnly";
import Todos from "@/components/Todos";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
        <meta name="description" content="NestJS API Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ClientOnly>
          <Todos />
        </ClientOnly>
      </main>
    </>
  );
}
