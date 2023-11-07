import { gql } from "@apollo/client";

export const GET_VENDOR_REVIEWS = gql`
  query GetVendorReviews(
    $status: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorReviews(
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
    $vendorId: String!
    $status: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorByIdReviews(
      vendorId: $vendorId
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
  query GetVendorReviewsStarsAvg($vendorId: String!, $status: String) {
    vendorReviewStarsAvg(vendorId: $vendorId, status: $status) {
      rating
    }
  }
`;

export const GET_VENDORS_REVIEWS_TOP_RATED = gql`
  query GetVendorsReviewsTopRated($status: String!, $limit: Int) {
    vendorsReviewsTopRated(status: $status, limit: $limit) {
      rating
    }
  }
`;

export const GET_VENDOR_REVIEW_BY_ID = gql`
  query GetVendorReviewById($id: String!) {
    vendorReviewById(id: $id) {
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
  mutation CreateVendorReview(
    $vendorId: String!
    $customerId: String!
    $stars: Int
    $comment: String
    $status: String
    $publishedAt: String
  ) {
    createVendorReview(
      vendorId: $vendorId
      customerId: $customerId
      stars: $stars
      comment: $comment
      status: $status
      publishedAt: $publishedAt
    ) {
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
  mutation UpdateVendorReview($id: String!, $stars: Int, $comment: String) {
    updateVendorReview(id: $id, stars: $stars, comment: $comment) {
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
  mutation UpdateVendorReviewStatus($id: String!, $status: String) {
    updateVendorReviewStatus(id: $id, status: $status) {
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
  mutation DeleteVendorReview($id: String!) {
    deleteVendorReview(id: $id) {
      id
    }
  }
`;
