import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    adminVendorMessages(
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
          }
          vendor {
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

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($pl: String!) {
    createAdminVendorMessage(pl: $pl) {
      id
      user {
        id
      }
      vendor {
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
    updateAdminVendorMessage(pl: $pl) {
      id
      message
    }
  }
`;

export const UPDATE_MESSAGE_SEEN = gql`
  mutation UpdateMessageSeen($pl: String!) {
    updateAdminVendorMessageSeen(pl: $pl) {
      id
      isSeen
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($pl: String!) {
    deleteAdminVendorMessage(pl: $pl) {
      id
    }
  }
`;
