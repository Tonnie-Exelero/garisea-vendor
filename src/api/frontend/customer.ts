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
    $status: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    customersByStatus(
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
  query GetFilteredCustomers($filter: String!) {
    customersFiltered(filter: $filter) {
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
  query GetCustomerById($id: String!) {
    customerById(id: $id) {
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
  query GetCustomerByEmail($email: String!) {
    customerByEmail(email: $email) {
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
  mutation CreateCustomer(
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
  ) {
    createCustomer(
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
    ) {
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
  mutation UpdateCustomer(
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
  ) {
    updateCustomer(
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
    ) {
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
  mutation UpdateCustomerPassword($id: String!, $password: String!) {
    updateCustomerPassword(id: $id, password: $password) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: String!, $image: String!) {
    updateCustomerImage(id: $id, image: $image) {
      id
      image
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateCustomerEmailVerified(
    $id: String!
    $emailVerified: String!
    $status: String!
  ) {
    updateCustomerEmailVerified(
      id: $id
      emailVerified: $emailVerified
      status: $status
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: String!) {
    deleteCustomer(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
