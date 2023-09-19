import { gql } from "@apollo/client";

export const CUSTOMER_REGISTER = gql`
  mutation RegisterCustomer(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createCustomer(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

export const CUSTOMER_LOGIN = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    loginCustomer(email: $email, password: $password) {
      id
      firstName
      lastName
      username
      email
      password
      phone
      image
      language
      status
      address
      city
      country
      token
    }
  }
`;
