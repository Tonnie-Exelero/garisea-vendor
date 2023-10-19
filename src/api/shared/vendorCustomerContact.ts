import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts(
    $vendorId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorCustomerContacts(
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
          vehicle {
            id
            brand {
              name
            }
            model {
              name
            }
            trim
            slug
            yearOfManufacture
            yearOfFirstRegistration
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
    $vendorId: String!
    $customerId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    contactsByVendorCustomerVehicleIds(
      vendorId: $vendorId
      customerId: $customerId
      vehicleId: $vehicleId
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
          vehicle {
            id
            brand {
              name
            }
            model {
              name
            }
            trim
            slug
            yearOfManufacture
            yearOfFirstRegistration
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
    $vendorId: String!
    $customerId: String!
    $vehicleId: String
    $latestMessageTime: String!
  ) {
    createVendorCustomerContact(
      vendorId: $vendorId
      customerId: $customerId
      vehicleId: $vehicleId
      latestMessageTime: $latestMessageTime
    ) {
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
      vehicle {
        id
        brand {
          name
        }
        model {
          name
        }
        trim
        slug
        yearOfManufacture
        yearOfFirstRegistration
      }
      latestMessageTime
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: String!, $latestMessageTime: String!) {
    updateVendorCustomerContact(
      id: $id
      latestMessageTime: $latestMessageTime
    ) {
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
      vehicle {
        id
        brand {
          name
        }
        model {
          name
        }
        trim
        slug
        yearOfManufacture
        yearOfFirstRegistration
      }
      latestMessageTime
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: String!) {
    deleteVendorCustomerContact(id: $id) {
      id
    }
  }
`;
