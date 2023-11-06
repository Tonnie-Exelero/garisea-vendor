import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessages(
    $vendorId: String!
    $customerId: String!
    $vehicleId: String
    $senderId: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorCustomerMessages(
      vendorId: $vendorId
      customerId: $customerId
      vehicleId: $vehicleId
      senderId: $senderId
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
    $customerId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    customerMessages(
      customerId: $customerId
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
  query GetNewMessagesCount($customerId: String!) {
    newMessagesCount(customerId: $customerId) {
      message
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $vendorId: String!
    $customerId: String!
    $vehicleId: String
    $senderId: String!
    $type: String
    $message: String!
    $timeSent: String!
    $isSent: Boolean
    $isSeen: Boolean
  ) {
    createVendorCustomerMessage(
      vendorId: $vendorId
      customerId: $customerId
      vehicleId: $vehicleId
      senderId: $senderId
      type: $type
      message: $message
      timeSent: $timeSent
      isSent: $isSent
      isSeen: $isSeen
    ) {
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
  mutation UpdateMessage($id: String!, $message: String) {
    updateVendorCustomerMessage(id: $id, message: $message) {
      id
      message
    }
  }
`;

export const UPDATE_MESSAGE_SEEN = gql`
  mutation UpdateMessageSeen($id: String!, $isSeen: Boolean) {
    updateVendorCustomerMessageSeen(id: $id, isSeen: $isSeen) {
      id
      isSeen
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: String!) {
    deleteVendorCustomerMessage(id: $id) {
      id
    }
  }
`;
