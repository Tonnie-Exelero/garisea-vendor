import { gql } from "@apollo/client";

export const GET_VEHICLE_REVIEWS = gql`
  query GetVehicleReviews(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehicleReviews(
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
          publishedAt
          vehicle {
            id
            entryNo
            vendor {
              firstName
              lastName
              image
              organization {
                name
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
          }
          customer {
            id
            firstName
            lastName
            image
          }
          stars
          comment
          status
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

export const GET_VEHICLE_BY_ID_REVIEWS = gql`
  query GetVehicleByIdReviews(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehicleByIdReviews(
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
          publishedAt
          vehicle {
            id
            entryNo
            vendor {
              firstName
              lastName
              image
              organization {
                name
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
          }
          customer {
            id
            firstName
            lastName
            image
          }
          stars
          comment
          status
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

export const GET_VEHICLE_REVIEWS_COUNT = gql`
  query GetVehicleReviewsCount {
    vehicleReviewsCount {
      count
    }
  }
`;

export const GET_VEHICLE_REVIEWS_STARS_AVG = gql`
  query GetVehicleReviewsStarsAvg($pl: String!) {
    vehicleReviewStarsAvg(pl: $pl) {
      rating
    }
  }
`;

export const GET_VEHICLES_REVIEWS_TOP_RATED = gql`
  query GetVehiclesReviewsTopRated($pl: String!) {
    vehiclesReviewsTopRated(pl: $pl) {
      rating
    }
  }
`;

export const GET_VEHICLE_REVIEW_BY_ID = gql`
  query GetVehicleReviewById($pl: String!) {
    vehicleReviewById(pl: $pl) {
      id
      publishedAt
      vehicle {
        id
        entryNo
        vendor {
          firstName
          lastName
          image
          organization {
            name
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
      }
      customer {
        id
        firstName
        lastName
        image
      }
      stars
      comment
      status
    }
  }
`;

export const CREATE_VEHICLE_REVIEW = gql`
  mutation CreateVehicleReview($pl: String!) {
    createVehicleReview(pl: $pl) {
      id
      publishedAt
      vehicle {
        id
        entryNo
        vendor {
          firstName
          lastName
          image
          organization {
            name
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
      }
      customer {
        id
        firstName
        lastName
        image
      }
      stars
      comment
      status
    }
  }
`;

export const UPDATE_VEHICLE_REVIEW = gql`
  mutation UpdateVehicleReview($pl: String!) {
    updateVehicleReview(pl: $pl) {
      id
      publishedAt
      vehicle {
        id
        entryNo
        vendor {
          firstName
          lastName
          image
          organization {
            name
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
      }
      customer {
        id
        firstName
        lastName
        image
      }
      stars
      comment
      status
    }
  }
`;

export const UPDATE_VEHICLE_REVIEW_STATUS = gql`
  mutation UpdateVehicleReviewStatus($pl: String!) {
    updateVehicleReviewStatus(pl: $pl) {
      id
      publishedAt
      vehicle {
        id
        entryNo
        vendor {
          firstName
          lastName
          image
          organization {
            name
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
      }
      customer {
        id
        firstName
        lastName
        image
      }
      stars
      comment
      status
    }
  }
`;

export const DELETE_VEHICLE_REVIEW = gql`
  mutation DeleteVehicleReview($pl: String!) {
    deleteVehicleReview(pl: $pl) {
      id
    }
  }
`;
