import Head from "next/head";
import { GET_ALL_TODOS } from "@/util/graphql/query";
import { getClient } from "@/util/apollo-client";
import Title from "@/components/Title";
import { TodoItem } from "@/components/AllTodos";
import { Layout } from "@/components/Layout";
import Error from "@/components/Error";

export const getServerSideProps = async () => {
  const client = getClient();
  try {
    const { data } = await client.query({ query: GET_ALL_TODOS });
    return {
      props: {
        todos: data.Todos as Todo[],
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Could not get data",
      },
    };
  }
};

export default function Home(props: { todos: Todo[]; error: string }) {
  if (props.error || !props.todos) return <Error error={props.error} />;

  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
      </Head>
      <Layout>
        <Title text="All todos!" />
        <div>
          {props.todos.map((item, index) => (
            <TodoItem key={index} todo={item} />
          ))}
        </div>
      </Layout>
    </>
  );
}
