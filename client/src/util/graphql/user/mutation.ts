import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation {
    CreateUser(UserInput: { email: $email, name: $name, password: $password }) {
      _id
      email
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation {
    DeleteUser(UserInput: { id: $id }) {
      _id
      email
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation {
    UpdateUser(UserInput: { id: $id, email: $email, name: $name, password: $password }) {
      _id
      email
      name
    }
  }
`;
