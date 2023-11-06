import { gql } from "@apollo/client";

export const GET_BANNERS = gql`
  query GetBanners($first: Int, $last: Int, $after: ID, $before: ID) {
    banners(first: $first, last: $last, after: $after, before: $before) {
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
    $type: String
    $title: String
    $link: String
    $page: String
    $position: String
  ) {
    bannersFiltered(
      type: $type
      title: $title
      link: $link
      page: $page
      position: $position
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
  query GetBannerById($id: String!) {
    bannerById(id: $id) {
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
  mutation CreateBanner(
    $type: String
    $title: String
    $link: String
    $image: String
    $page: String
    $position: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    createBanner(
      type: $type
      title: $title
      link: $link
      image: $image
      page: $page
      position: $position
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
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
  mutation UpdateBanner(
    $id: String!
    $type: String
    $title: String
    $link: String
    $image: String
    $page: String
    $position: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    updateBanner(
      id: $id
      type: $type
      title: $title
      link: $link
      image: $image
      page: $page
      position: $position
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
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

export const UPDATE_BANNER_IMPRESSIONS = gql`
  mutation UpdateBannerImpressions($id: String!, $impressions: Int) {
    updateBannerImpressions(id: $id, impressions: $impressions) {
      id
      impressions
    }
  }
`;

export const UPDATE_BANNER_CLICKS = gql`
  mutation UpdateBannerClicks($id: String!, $clicks: Int) {
    updateBannerClicks(id: $id, clicks: $clicks) {
      id
      clicks
    }
  }
`;

export const DELETE_BANNER = gql`
  mutation DeleteBanner($id: String!) {
    deleteBanner(id: $id) {
      id
    }
  }
`;
