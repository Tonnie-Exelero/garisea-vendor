import { gql } from "@apollo/client";

export const GET_MAIN_CAROUSELS = gql`
  query GetMainCarousels(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    mainCarousels(
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
          type
          title
          image
          buttonLink
          buttonText
          description
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

export const GET_FILTERED_MAIN_CAROUSELS = gql`
  query GetFilteredMainCarousels(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    mainCarouselsFiltered(
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
          type
          title
          image
          buttonLink
          buttonText
          description
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

export const GET_MAIN_CAROUSEL_BY_ID = gql`
  query GetMainCarouselById($pl: String!) {
    mainCarouselById(pl: $pl) {
      id
      type
      title
      image
      buttonLink
      buttonText
      description
      rank
      impressions
      clicks
      targetImpressions
      targetClicks
    }
  }
`;

export const CREATE_MAIN_CAROUSEL = gql`
  mutation CreateMainCarousel($pl: String!) {
    createMainCarousel(pl: $pl) {
      id
      type
      title
      image
      buttonLink
      buttonText
      description
      rank
      impressions
      clicks
      targetImpressions
      targetClicks
    }
  }
`;

export const UPDATE_MAIN_CAROUSEL = gql`
  mutation UpdateMainCarousel($pl: String!) {
    updateMainCarousel(pl: $pl) {
      id
      type
      title
      image
      buttonLink
      buttonText
      description
      rank
      impressions
      clicks
      targetImpressions
      targetClicks
    }
  }
`;

export const UPDATE_MAIN_CAROUSEL_STATUS = gql`
  mutation UpdateMainCarouselStatus($pl: String!) {
    updateMainCarouselStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_MAIN_CAROUSEL_IMPRESSIONS = gql`
  mutation UpdateMainCarouselImpressions($pl: String!) {
    updateMainCarouselImpressions(pl: $pl) {
      id
      impressions
    }
  }
`;

export const UPDATE_MAIN_CAROUSEL_CLICKS = gql`
  mutation UpdateMainCarouselClicks($pl: String!) {
    updateMainCarouselClicks(pl: $pl) {
      id
      clicks
    }
  }
`;

export const DELETE_MAIN_CAROUSEL = gql`
  mutation DeleteMainCarousel($pl: String!) {
    deleteMainCarousel(pl: $pl) {
      id
    }
  }
`;
