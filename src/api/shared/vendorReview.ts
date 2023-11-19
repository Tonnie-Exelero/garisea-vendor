import { gql } from "@apollo/client";

export const GET_VENDOR_REVIEWS = gql`
  query GetVendorReviews(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorReviews(
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
          vendor {
            id
            firstName
            lastName
            image
            organization {
              name
            }
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

export const GET_VENDOR_BY_ID_REVIEWS = gql`
  query GetVendorByIdReviews(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorByIdReviews(
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
          vendor {
            id
            firstName
            lastName
            image
            organization {
              name
            }
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

export const GET_VENDOR_REVIEWS_COUNT = gql`
  query GetVendorReviewsCount {
    vendorReviewsCount {
      count
    }
  }
`;

export const GET_VENDOR_REVIEWS_STARS_AVG = gql`
  query GetVendorReviewsStarsAvg($pl: String!) {
    vendorReviewStarsAvg(pl: $pl) {
      rating
    }
  }
`;

export const GET_VENDORS_REVIEWS_TOP_RATED = gql`
  query GetVendorsReviewsTopRated($pl: String!) {
    vendorsReviewsTopRated(pl: $pl) {
      rating
    }
  }
`;

export const GET_VENDOR_REVIEW_BY_ID = gql`
  query GetVendorReviewById($pl: String!) {
    vendorReviewById(pl: $pl) {
      id
      publishedAt
      vendor {
        id
        firstName
        lastName
        image
        organization {
          name
        }
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

export const CREATE_VENDOR_REVIEW = gql`
  mutation CreateVendorReview($pl: String!) {
    createVendorReview(pl: $pl) {
      id
      publishedAt
      vendor {
        id
        firstName
        lastName
        image
        organization {
          name
        }
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

export const UPDATE_VENDOR_REVIEW = gql`
  mutation UpdateVendorReview($pl: String!) {
    updateVendorReview(pl: $pl) {
      id
      publishedAt
      vendor {
        id
        firstName
        lastName
        image
        organization {
          name
        }
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

export const UPDATE_VENDOR_REVIEW_STATUS = gql`
  mutation UpdateVendorReviewStatus($pl: String!) {
    updateVendorReviewStatus(pl: $pl) {
      id
      publishedAt
      vendor {
        id
        firstName
        lastName
        image
        organization {
          name
        }
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

export const DELETE_VENDOR_REVIEW = gql`
  mutation DeleteVendorReview($pl: String!) {
    deleteVendorReview(pl: $pl) {
      id
    }
  }
`;
