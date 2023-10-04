import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($email: String!) {
    logoutUser(email: $email) {
      email
    }
  }
`;
