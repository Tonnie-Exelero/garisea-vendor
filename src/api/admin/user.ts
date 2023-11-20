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
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    usersByRoleId(
      pl: $pl
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
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    usersByStatus(
      pl: $pl
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
  query GetFilteredUsers(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    usersFiltered(
      pl: $pl
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
  query GetUserById($pl: String!) {
    userById(pl: $pl) {
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
  query GetUserByEmail($pl: String!) {
    userByEmail(pl: $pl) {
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
  mutation CreateUser($pl: String!) {
    createUser(pl: $pl) {
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
  mutation UpdateUser($pl: String!) {
    updateUser(pl: $pl) {
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
  mutation UpdatePassword($pl: String!) {
    updatePassword(pl: $pl) {
      id
      firstName
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($pl: String!) {
    updateUserImage(pl: $pl) {
      id
      image
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($pl: String!) {
    updateUserStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateUserEmailVerified($pl: String!) {
    updateUserEmailVerified(pl: $pl) {
      id
      emailVerified
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($pl: String!) {
    deleteUser(pl: $pl) {
      id
    }
  }
`;
