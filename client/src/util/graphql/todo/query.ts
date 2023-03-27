import { gql } from "@apollo/client";

export const GET_TODO_BY_ID = gql`
  query ($id: String!) {
    Todo(todoInput: $id) {
      _id
      todo
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query {
    Todos {
      _id
      todo
    }
  }
`;

export const GET_ALL_TODOS_BY_USER = gql`
  query {
    UserTodos {
      _id
      userID
      todo
    }
  }
`;
