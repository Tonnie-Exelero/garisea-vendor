import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($pl: String!) {
    loginUser(pl: $pl) {
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($pl: String!) {
    logoutUser(pl: $pl) {
      email
    }
  }
`;
