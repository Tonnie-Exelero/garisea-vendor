import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    adminVendorContacts(
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
          user {
            id
            firstName
            lastName
            image
            onlineStatus
          }
          vendor {
            id
            firstName
            lastName
            image
            onlineStatus
          }
          latestMessageTime
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

export const GET_CONTACTS_BY_IDS = gql`
  query GetContactsByIds(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    contactsByAdminVendorIds(
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
          user {
            id
            firstName
            lastName
            image
            onlineStatus
          }
          vendor {
            id
            firstName
            lastName
            image
            onlineStatus
          }
          latestMessageTime
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

export const CREATE_CONTACT = gql`
  mutation CreateContact($pl: String!) {
    createAdminVendorContact(pl: $pl) {
      id
      user {
        id
        firstName
        lastName
        image
        onlineStatus
      }
      vendor {
        id
        firstName
        lastName
        image
        onlineStatus
      }
      latestMessageTime
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($pl: String!) {
    updateAdminVendorContact(pl: $pl) {
      id
      user {
        id
        firstName
        lastName
        image
        onlineStatus
      }
      vendor {
        id
        firstName
        lastName
        image
        onlineStatus
      }
      latestMessageTime
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($pl: String!) {
    deleteAdminVendorContact(pl: $pl) {
      id
    }
  }
`;
