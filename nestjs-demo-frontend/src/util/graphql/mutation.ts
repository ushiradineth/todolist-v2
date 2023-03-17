import { gql } from "@apollo/client";

const QUERY = gql`
  query {
    Todo(todoInput: $id) {
      _id
      name
      todo
      uuid
    }
  }
`;
