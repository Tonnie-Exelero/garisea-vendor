import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorCustomerContacts(
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
          vendor {
            id
            firstName
            lastName
            image
            storeLink
            onlineStatus
            organization {
              nicename
              name
            }
          }
          customer {
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
    contactsByVendorCustomerVehicleIds(
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
          vendor {
            id
            firstName
            lastName
            image
            storeLink
            onlineStatus
          }
          customer {
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
    createVendorCustomerContact(pl: $pl) {
      id
      vendor {
        id
        firstName
        lastName
        image
        storeLink
        onlineStatus
      }
      customer {
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
    updateVendorCustomerContact(pl: $pl) {
      id
      vendor {
        id
        firstName
        lastName
        image
        storeLink
        onlineStatus
      }
      customer {
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
    deleteVendorCustomerContact(pl: $pl) {
      id
    }
  }
`;
