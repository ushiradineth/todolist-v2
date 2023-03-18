import { gql } from "@apollo/client";

export const getTodoByID = gql`
  query {
    Todo(todoInput: $id) {
      _id
      name
      todo
      uuid
    }
  }
`;

export const getAllTodos = gql`
  query {
    Todos {
      _id
      name
      todo
    }
  }
`;
