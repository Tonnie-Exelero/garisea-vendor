import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers($first: Int, $last: Int, $after: ID, $before: ID) {
    customers(first: $first, last: $last, after: $after, before: $before) {
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

export const GET_CUSTOMERS_BY_STATUS = gql`
  query GetCustomersByStatus(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    customersByStatus(
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

export const GET_FILTERED_CUSTOMERS = gql`
  query GetFilteredCustomers(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    customersFiltered(
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

export const GET_CUSTOMER_BY_ID = gql`
  query GetCustomerById($pl: String!) {
    customerById(pl: $pl) {
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
    }
  }
`;

export const GET_CUSTOMER_BY_EMAIL = gql`
  query GetCustomerByEmail($pl: String!) {
    customerByEmail(pl: $pl) {
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
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($pl: String!) {
    createCustomer(pl: $pl) {
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
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($pl: String!) {
    updateCustomer(pl: $pl) {
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
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdateCustomerPassword($pl: String!) {
    updateCustomerPassword(pl: $pl) {
      id
      firstName
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($pl: String!) {
    updateCustomerImage(pl: $pl) {
      id
      image
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateCustomerEmailVerified($pl: String!) {
    updateCustomerEmailVerified(pl: $pl) {
      id
      emailVerified
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($pl: String!) {
    deleteCustomer(pl: $pl) {
      id
    }
  }
`;
