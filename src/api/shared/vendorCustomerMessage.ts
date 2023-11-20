import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorCustomerMessages(
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
          }
          customer {
            id
            firstName
            lastName
            image
          }
          senderId
          type
          message
          timeSent
          isSent
          isSeen
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

export const GET_CUSTOMER_MESSAGES = gql`
  query GetMessages(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    customerMessages(
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
          }
          customer {
            id
          }
          senderId
          type
          message
          timeSent
          isSent
          isSeen
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

export const GET_NEW_CUSTOMER_MESSAGES_COUNT = gql`
  query GetNewMessagesCount($pl: String!) {
    newMessagesCount(pl: $pl) {
      message
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($pl: String!) {
    createVendorCustomerMessage(pl: $pl) {
      id
      vendor {
        id
      }
      customer {
        id
      }
      senderId
      type
      message
      timeSent
      isSent
      isSeen
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($pl: String!) {
    updateVendorCustomerMessage(pl: $pl) {
      id
      message
    }
  }
`;

export const UPDATE_MESSAGE_SEEN = gql`
  mutation UpdateMessageSeen($pl: String!) {
    updateVendorCustomerMessageSeen(pl: $pl) {
      id
      isSeen
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($pl: String!) {
    deleteVendorCustomerMessage(pl: $pl) {
      id
    }
  }
`;
