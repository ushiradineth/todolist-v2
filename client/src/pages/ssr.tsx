import Head from "next/head";
import { getClient } from "@/util/apollo-client";
import Title from "@/components/Title";
import { TodoItem } from "@/components/AllTodos";
import Error from "@/components/Error";
import { GET_ALL_TODOS_BY_USER } from "@/util/graphql/todo/query";
import { Card } from "@/components/styles/Card.styled";

export const getServerSideProps = async () => {
  const client = getClient();

  try {
    const { data } = await client.query({ query: GET_ALL_TODOS_BY_USER });
    return {
      props: {
        todos: data.UserTodos as Todo[],
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
      <Card>
        <Title text="All todos!" />
        <div>
          {props.todos.map((item, index) => (
            <TodoItem key={index} todo={item} />
          ))}
          {props.todos.length === 0 && <p>No todos.</p>}
        </div>
      </Card>
    </>
  );
}
