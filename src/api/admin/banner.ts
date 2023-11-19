import { gql } from "@apollo/client";

export const GET_BANNERS = gql`
  query GetBanners(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    banners(
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
          link
          image
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

export const GET_FILTERED_BANNERS = gql`
  query GetFilteredBanners(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    bannersFiltered(
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
          link
          image
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

export const GET_BANNER_BY_ID = gql`
  query GetBannerById($pl: String!) {
    bannerById(pl: $pl) {
      id
      type
      title
      link
      image
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

export const CREATE_BANNER = gql`
  mutation CreateBanner($pl: String) {
    createBanner(pl: $pl) {
      id
      type
      title
      link
      image
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

export const UPDATE_BANNER = gql`
  mutation UpdateBanner($pl: String!) {
    updateBanner(pl: $pl) {
      id
      type
      title
      link
      image
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

export const UPDATE_BANNER_STATUS = gql`
  mutation UpdateBannerStatus($pl: String!) {
    updateBannerStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_BANNER_IMPRESSIONS = gql`
  mutation UpdateBannerImpressions($pl: String!) {
    updateBannerImpressions(pl: $pl) {
      id
      impressions
    }
  }
`;

export const UPDATE_BANNER_CLICKS = gql`
  mutation UpdateBannerClicks($pl: String!) {
    updateBannerClicks(pl: $pl) {
      id
      clicks
    }
  }
`;

export const DELETE_BANNER = gql`
  mutation DeleteBanner($pl: String!) {
    deleteBanner(pl: $pl) {
      id
    }
  }
`;
