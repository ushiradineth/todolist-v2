import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $todo: String!) {
    createTodo(todoInput: { name: $name, todo: $todo }) {
      name: name
      todo: todo
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(todoInput: { id: $id }) {
      _id: _id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $todo: String!) {
    updateTodo(todoInput: { id: $id, todo: $todo }) {
      _id: _id
      todo: todo
    }
  }
`;
