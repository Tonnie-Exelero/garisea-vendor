import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($first: Int, $last: Int, $after: ID, $before: ID) {
    users(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
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
          onlineStatus
          role {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_USERS_BY_ROLE_ID = gql`
  query GetUsersByRoleId(
    $roleId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    usersByRoleId(
      roleId: $roleId
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
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
          onlineStatus
          role {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_USERS_BY_STATUS = gql`
  query GetUsersByStatus(
    $status: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    usersByStatus(
      status: $status
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
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
          onlineStatus
          role {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_FILTERED_USERS = gql`
  query GetFilteredUsers($filter: String!) {
    usersFiltered(filter: $filter) {
      edges {
        cursor
        node {
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
          onlineStatus
          role {
            id
            name
            slug
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    userById(id: $id) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String
    $lastName: String
    $username: String!
    $email: String!
    $password: String
    $phone: String
    $image: String
    $language: String
    $status: String
    $address: String
    $city: String
    $country: String
    $emailVerified: String
    $roleId: ID
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      phone: $phone
      image: $image
      language: $language
      status: $status
      address: $address
      city: $city
      country: $country
      emailVerified: $emailVerified
      roleId: $roleId
    ) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String!
    $firstName: String
    $lastName: String
    $username: String
    $phone: String
    $image: String
    $language: String
    $status: String
    $address: String
    $city: String
    $country: String
    $roleId: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      phone: $phone
      image: $image
      language: $language
      status: $status
      address: $address
      city: $city
      country: $country
      roleId: $roleId
    ) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($id: String!, $password: String!) {
    updatePassword(id: $id, password: $password) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: String!, $image: String!) {
    updateUserImage(id: $id, image: $image) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: String!, $status: String!) {
    updateUserStatus(id: $id, status: $status) {
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
      emailVerified
      onlineStatus
      role {
        id
        name
        slug
      }
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateUserEmailVerified($id: String!, $emailVerified: String!) {
    updateUserEmailVerified(id: $id, emailVerified: $emailVerified) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
