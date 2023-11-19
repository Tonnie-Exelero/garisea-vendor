import { gql } from "@apollo/client";

export const GET_FEATURED_VEHICLES = gql`
  query GetFeaturedVehicles(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    featuredVehicles(
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
          vehicle {
            id
            vendor {
              storeLink
              vendorVerified
              organization {
                name
                nicename
              }
            }
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
            images
            status
          }
          page
          position
          rank
          impressions
          clicks
          targetImpressions
          targetClicks
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

export const GET_FILTERED_FEATURED_VEHICLES = gql`
  query GetFilteredFeaturedVehicles(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    featuredVehiclesFiltered(
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
          vehicle {
            id
            vendor {
              storeLink
              vendorVerified
              organization {
                name
                nicename
              }
            }
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
            images
            status
          }
          page
          position
          rank
          impressions
          clicks
          targetImpressions
          targetClicks
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

export const GET_FEATURED_VEHICLE_BY_ID = gql`
  query GetFeaturedVehicleById($pl: String!) {
    featuredVehicleById(pl: $pl) {
      id
      vehicle {
        id
        vendor {
          storeLink
          vendorVerified
          organization {
            name
            nicename
          }
        }
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
        images
        status
      }
      page
      position
      rank
      impressions
      clicks
      targetImpressions
      targetClicks
    }
  }
`;

export const CREATE_FEATURED_VEHICLE = gql`
  mutation CreateFeaturedVehicle($pl: String!) {
    createFeaturedVehicle(pl: $pl) {
      id
      vehicle {
        id
        vendor {
          storeLink
          vendorVerified
          organization {
            name
            nicename
          }
        }
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
        images
        status
      }
      page
      position
      rank
      impressions
      clicks
      targetImpressions
      targetClicks
    }
  }
`;

export const UPDATE_FEATURED_VEHICLE = gql`
  mutation UpdateFeaturedVehicle($pl: String!) {
    updateFeaturedVehicle(pl: $pl) {
      id
      vehicle {
        id
        vendor {
          storeLink
          vendorVerified
          organization {
            name
            nicename
          }
        }
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
        images
        status
      }
      page
      position
      rank
      impressions
      clicks
      targetImpressions
      targetClicks
    }
  }
`;

export const UPDATE_FEATURED_VEHICLE_STATUS = gql`
  mutation UpdateFeaturedVehicleStatus($pl: String!) {
    updateFeaturedVehicleStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_FEATURED_VEHICLE_IMPRESSIONS = gql`
  mutation UpdateFeaturedVehicleImpressions($pl: String!) {
    updateFeaturedVehicleImpressions(pl: $pl) {
      id
      impressions
    }
  }
`;

export const UPDATE_FEATURED_VEHICLE_CLICKS = gql`
  mutation UpdateFeaturedVehicleClicks($pl: String!) {
    updateFeaturedVehicleClicks(pl: $pl) {
      id
      clicks
    }
  }
`;

export const DELETE_FEATURED_VEHICLE = gql`
  mutation DeleteFeaturedVehicle($pl: String!) {
    deleteFeaturedVehicle(pl: $pl) {
      id
    }
  }
`;
