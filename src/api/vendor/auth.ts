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
      id
      firstName
      lastName
      username
      email
      phone
      image
      language
      status
      address
      city
      country
      emailVerified
      addedOrganization
      organization {
        id
        name
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
      }
    }
  }
`;
