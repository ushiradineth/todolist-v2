import { gql } from "@apollo/client";

export const USER = gql`
  query {
    User {
      _id
      email
      name
    }
  }
`;


export const GET_ALL_USERS = gql`
  query {
    Users {
      _id
      email
      name
    }
  }
`;
