import Head from "next/head";
import { GET_ALL_TODOS } from "@/util/graphql/query";
import { getClient } from "@/util/apollo-client";
import { Card } from "@/components/styles/Card.styled";
import { Container } from "@/components/styles/Container.styled";
import Title from "@/components/Title";
import { TodoItem } from "@/components/AllTodos";
import BackButton from "@/components/BackButton";

export const getServerSideProps = async () => {
  const client = getClient();
  const { data } = await client.query({ query: GET_ALL_TODOS });

  return {
    props: {
      todos: data.Todos as Todo[],
    },
  };
};

export default function Home(props: { todos: Todo[] }) {
  return (
    <>
      <Head>
        <title>NestJS API Demo Frontend with NextJS</title>
      </Head>
      <Container>
        <Card>
          <BackButton />
          <Title text="All todos!" />
          <div>
            {props.todos.map((item, index) => (
              <TodoItem key={index} todo={item} />
            ))}
          </div>
        </Card>
      </Container>
    </>
  );
}
