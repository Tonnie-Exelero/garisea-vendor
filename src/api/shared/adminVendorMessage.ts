import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages(
    $userId: String!
    $vendorId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    adminVendorMessages(
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
  mutation CreateMessage(
    $userId: String!
    $vendorId: String!
    $senderId: String!
    $type: String
    $message: String!
    $timeSent: String!
    $isSent: Boolean
    $isSeen: Boolean
  ) {
    createAdminVendorMessage(
      userId: $userId
      vendorId: $vendorId
      senderId: $senderId
      type: $type
      message: $message
      timeSent: $timeSent
      isSent: $isSent
      isSeen: $isSeen
    ) {
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
  mutation UpdateMessage($id: String!, $message: String) {
    updateAdminVendorMessage(id: $id, message: $message) {
      id
      message
    }
  }
`;

export const UPDATE_MESSAGE_SEEN = gql`
  mutation UpdateMessageSeen($id: String!, $isSeen: Boolean) {
    updateAdminVendorMessageSeen(id: $id, isSeen: $isSeen) {
      id
      isSeen
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: String!) {
    deleteAdminVendorMessage(id: $id) {
      id
    }
  }
`;
