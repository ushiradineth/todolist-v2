import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query ($id: String!) {
    User(UserInput: $id) {
      _id
      email
      name
      password
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    Todos {
      _id
      email
      name
    }
  }
`;
