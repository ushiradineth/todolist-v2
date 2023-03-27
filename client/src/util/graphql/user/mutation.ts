import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($email: String!, $name: String!, $password: String!) {
    CreateUser(UserInput: { email: $email, name: $name, password: $password }) {
      _id
      email
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation {
    DeleteUser {
      _id
      email
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($id: String!, $email: String!, $name: String!, $password: String!) {
    UpdateUser(UserInput: { email: $email, name: $name, password: $password }) {
      _id
      email
      name
    }
  }
`;
