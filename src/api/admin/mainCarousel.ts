import { gql } from "@apollo/client";

export const GET_MAIN_CAROUSELS = gql`
  query GetMainCarousels($first: Int, $last: Int, $after: ID, $before: ID) {
    mainCarousels(first: $first, last: $last, after: $after, before: $before) {
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
    $type: String
    $title: String
    $buttonLink: String
    $buttonText: String
    $description: String
  ) {
    mainCarouselsFiltered(
      type: $type
      title: $title
      buttonLink: $buttonLink
      buttonText: $buttonText
      description: $description
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
  query GetMainCarouselById($id: String!) {
    mainCarouselById(id: $id) {
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
  mutation CreateMainCarousel(
    $type: String
    $title: String
    $image: String
    $buttonLink: String
    $buttonText: String
    $description: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    createMainCarousel(
      type: $type
      title: $title
      image: $image
      buttonLink: $buttonLink
      buttonText: $buttonText
      description: $description
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
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
  mutation UpdateMainCarousel(
    $id: String!
    $type: String
    $title: String
    $image: String
    $buttonLink: String
    $buttonText: String
    $description: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    updateMainCarousel(
      id: $id
      type: $type
      title: $title
      image: $image
      buttonLink: $buttonLink
      buttonText: $buttonText
      description: $description
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
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

export const UPDATE_MAIN_CAROUSEL_IMPRESSIONS = gql`
  mutation UpdateMainCarouselImpressions($id: String!, $impressions: Int) {
    updateMainCarouselImpressions(id: $id, impressions: $impressions) {
      id
      impressions
    }
  }
`;

export const UPDATE_MAIN_CAROUSEL_CLICKS = gql`
  mutation UpdateMainCarouselClicks($id: String!, $clicks: Int) {
    updateMainCarouselClicks(id: $id, clicks: $clicks) {
      id
      clicks
    }
  }
`;

export const DELETE_MAIN_CAROUSEL = gql`
  mutation DeleteMainCarousel($id: String!) {
    deleteMainCarousel(id: $id) {
      id
    }
  }
`;
