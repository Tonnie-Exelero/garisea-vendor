import { gql } from "@apollo/client";

export const GET_VEHICLE_REVIEWS = gql`
  query GetVehicleReviews(
    $status: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehicleReviews(
      status: $status
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
    $vehicleId: String!
    $status: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vehicleByIdReviews(
      vehicleId: $vehicleId
      status: $status
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
  query GetVehicleReviewsStarsAvg($vehicleId: String!, $status: String) {
    vehicleReviewStarsAvg(vehicleId: $vehicleId, status: $status) {
      rating
    }
  }
`;

export const GET_VEHICLES_REVIEWS_TOP_RATED = gql`
  query GetVehiclesReviewsTopRated($status: String!, $limit: Int) {
    vehiclesReviewsTopRated(status: $status, limit: $limit) {
      rating
    }
  }
`;

export const GET_VEHICLE_REVIEW_BY_ID = gql`
  query GetVehicleReviewById($id: String!) {
    vehicleReviewById(id: $id) {
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
  mutation CreateVehicleReview(
    $vehicleId: String!
    $customerId: String!
    $stars: Int
    $comment: String
    $status: String
    $publishedAt: String
  ) {
    createVehicleReview(
      vehicleId: $vehicleId
      customerId: $customerId
      stars: $stars
      comment: $comment
      status: $status
      publishedAt: $publishedAt
    ) {
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
  mutation UpdateVehicleReview($id: String!, $stars: Int, $comment: String) {
    updateVehicleReview(id: $id, stars: $stars, comment: $comment) {
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
  mutation UpdateVehicleReviewStatus($id: String!, $status: String) {
    updateVehicleReviewStatus(id: $id, status: $status) {
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
  mutation DeleteVehicleReview($id: String!) {
    deleteVehicleReview(id: $id) {
      id
    }
  }
`;
