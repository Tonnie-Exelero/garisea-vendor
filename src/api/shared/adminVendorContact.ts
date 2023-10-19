import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts(
    $vendorId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    adminVendorContacts(
      vendorId: $vendorId
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
    $userId: String!
    $vendorId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    contactsByAdminVendorIds(
      userId: $userId
      vendorId: $vendorId
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
  mutation CreateContact(
    $userId: String!
    $vendorId: String!
    $latestMessageTime: String!
  ) {
    createAdminVendorContact(
      userId: $userId
      vendorId: $vendorId
      latestMessageTime: $latestMessageTime
    ) {
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
  mutation UpdateContact($id: String!, $latestMessageTime: String!) {
    updateAdminVendorContact(id: $id, latestMessageTime: $latestMessageTime) {
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
  mutation DeleteContact($id: String!) {
    deleteAdminVendorContact(id: $id) {
      id
    }
  }
`;
