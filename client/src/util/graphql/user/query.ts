import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query ($id: String!) {
    User(UserInput: $id) {
      _id
      email
      name
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query ($email: String!) {
    UserByEmail(UserInput: $email) {
      _id
      email
      name
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  query ($email: String!, $password: String!) {
    UserAuthentication (UserInput: { email: $email, password: $password }) {
      _id
      email
      name
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
