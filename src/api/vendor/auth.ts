import { gql } from "@apollo/client";

export const VENDOR_REGISTER = gql`
  mutation RegisterVendor(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createVendor(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

export const VENDOR_LOGIN = gql`
  mutation LoginVendor($email: String!, $password: String!) {
    loginVendor(email: $email, password: $password) {
      token
    }
  }
`;

export const VENDOR_LOGOUT = gql`
  mutation LogoutVendor($email: String!) {
    logoutVendor(email: $email) {
      email
    }
  }
`;
