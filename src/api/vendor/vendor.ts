import { gql } from "@apollo/client";

export const GET_VENDORS = gql`
  query GetVendors($first: Int, $last: Int, $after: ID, $before: ID) {
    vendors(first: $first, last: $last, after: $after, before: $before) {
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

export const GET_VENDORS_BY_STATUS = gql`
  query GetVendorsByStatus(
    $status: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorsByStatus(
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

export const GET_FILTERED_VENDORS = gql`
  query GetFilteredVendors($filter: String!) {
    vendorsFiltered(filter: $filter) {
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

export const GET_VENDOR_BY_ID = gql`
  query GetVendorById($id: String!) {
    vendorById(id: $id) {
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
    }
  }
`;

export const CREATE_VENDOR = gql`
  mutation CreateVendor(
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
    createVendor(
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
    }
  }
`;

export const UPDATE_VENDOR = gql`
  mutation UpdateVendor(
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
    updateVendor(
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
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdateVendorPassword($id: String!, $password: String!) {
    updateVendorPassword(id: $id, password: $password) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateVendorEmailVerified($id: String!, $emailVerified: String!) {
    updateVendorEmailVerified(id: $id, emailVerified: $emailVerified) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_VENDOR = gql`
  mutation DeleteVendor($id: String!) {
    deleteVendor(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
