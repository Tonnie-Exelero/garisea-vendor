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
      role {
        id
        name
        slug
        ability
        permissions {
          id
          name
          slug
          subjects
        }
      }
    }
  }
`;
