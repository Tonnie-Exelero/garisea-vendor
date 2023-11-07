import { gql } from "@apollo/client";

export const GET_FEATURED_VEHICLES = gql`
  query GetFeaturedVehicles($first: Int, $last: Int, $after: ID, $before: ID) {
    featuredVehicles(
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
    $vehicleId: String
    $page: String
    $position: String
  ) {
    featuredVehiclesFiltered(
      vehicleId: $vehicleId
      page: $page
      position: $position
    ) {
      edges {
        cursor
        node {
          id
          vehicle {
            id
            vendor {
              storeLink
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
  query GetFeaturedVehicleById($id: String!) {
    featuredVehicleById(id: $id) {
      id
      vehicle {
        id
        vendor {
          storeLink
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
  mutation CreateFeaturedVehicle(
    $vehicleId: String!
    $page: String
    $position: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    createFeaturedVehicle(
      vehicleId: $vehicleId
      page: $page
      position: $position
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
      id
      vehicle {
        id
        vendor {
          storeLink
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
  mutation UpdateFeaturedVehicle(
    $id: String!
    $page: String
    $position: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    updateFeaturedVehicle(
      id: $id
      page: $page
      position: $position
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
      id
      vehicle {
        id
        vendor {
          storeLink
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

export const UPDATE_FEATURED_VEHICLE_IMPRESSIONS = gql`
  mutation UpdateFeaturedVehicleImpressions($id: String!, $impressions: Int) {
    updateFeaturedVehicleImpressions(id: $id, impressions: $impressions) {
      id
      impressions
    }
  }
`;

export const UPDATE_FEATURED_VEHICLE_CLICKS = gql`
  mutation UpdateFeaturedVehicleClicks($id: String!, $clicks: Int) {
    updateFeaturedVehicleClicks(id: $id, clicks: $clicks) {
      id
      clicks
    }
  }
`;

export const DELETE_FEATURED_VEHICLE = gql`
  mutation DeleteFeaturedVehicle($id: String!) {
    deleteFeaturedVehicle(id: $id) {
      id
    }
  }
`;
