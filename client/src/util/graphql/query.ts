import { gql } from "@apollo/client";

export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: String!) {
    Todo(todoInput: $id) {
      _id
      name
      todo
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query {
    Todos {
      _id
      name
      todo
    }
  }
`;
