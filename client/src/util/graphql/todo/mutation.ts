import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation ($userID: String!, $todo: String!) {
    createTodo(todoInput: { userID: $userID, todo: $todo }) {
      userID: userID
      todo: todo
    }
  }
`;

export const DELETE_TODO = gql`
  mutation ($id: String!) {
    deleteTodo(todoInput: { id: $id }) {
      _id: _id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation ($id: String!, $todo: String!) {
    updateTodo(todoInput: { id: $id, todo: $todo }) {
      _id: _id
      todo: todo
    }
  }
`;
