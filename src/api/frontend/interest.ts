import { gql } from "@apollo/client";

export const GET_INTERESTS = gql`
  query GetInterests(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    interests(
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
          customer {
            id
            firstName
            lastName
            image
            onlineStatus
          }
          vehicle {
            id
            vendor {
              id
              storeLink
              vendorVerified
              organization {
                id
                name
                nicename
              }
            }
            brand {
              id
              name
            }
            model {
              id
              name
            }
            trim
            slug
            yearOfManufacture
            yearOfFirstRegistration
            condition
            images
            viewingLocation
            listingPrice
            discountedPrice
            reserved
            sold
          }
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

export const CREATE_INTEREST = gql`
  mutation CreateInterest($pl: String!) {
    createInterest(pl: $pl) {
      id
      customer {
        id
      }
      vehicle {
        id
      }
    }
  }
`;

export const DELETE_INTEREST = gql`
  mutation DeleteInterest($pl: String!) {
    deleteInterest(pl: $pl) {
      id
    }
  }
`;
