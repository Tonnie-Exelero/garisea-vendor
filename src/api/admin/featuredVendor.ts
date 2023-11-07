import { gql } from "@apollo/client";

export const GET_FEATURED_VENDORS = gql`
  query GetFeaturedVendors($first: Int, $last: Int, $after: ID, $before: ID) {
    featuredVendors(
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          vendor {
            id
            storeLink
            vendorVerified
            organization {
              id
              name
              nicename
              email
              phone
              address
              address2
              city
              country
              logo
            }
          }
          image
          text
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

export const GET_FILTERED_FEATURED_VENDORS = gql`
  query GetFilteredFeaturedVendors(
    $vendorId: String
    $text: String
    $page: String
    $position: String
  ) {
    featuredVendorsFiltered(
      vendorId: $vendorId
      text: $text
      page: $page
      position: $position
    ) {
      edges {
        cursor
        node {
          id
          vendor {
            id
            storeLink
            vendorVerified
            organization {
              id
              name
              nicename
              email
              phone
              address
              address2
              city
              country
              logo
            }
          }
          image
          text
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

export const GET_FEATURED_VENDOR_BY_ID = gql`
  query GetFeaturedVendorById($id: String!) {
    featuredVendorById(id: $id) {
      id
      vendor {
        id
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
          email
          phone
          address
          address2
          city
          country
          logo
        }
      }
      image
      text
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

export const CREATE_FEATURED_VENDOR = gql`
  mutation CreateFeaturedVendor(
    $vendorId: String!
    $image: String
    $text: String
    $page: String
    $position: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    createFeaturedVendor(
      vendorId: $vendorId
      image: $image
      text: $text
      page: $page
      position: $position
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
      id
      vendor {
        id
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
          email
          phone
          address
          address2
          city
          country
          logo
        }
      }
      image
      text
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

export const UPDATE_FEATURED_VENDOR = gql`
  mutation UpdateFeaturedVendor(
    $id: String!
    $image: String
    $text: String
    $page: String
    $position: String
    $rank: Int
    $impressions: Int
    $clicks: Int
    $targetImpressions: Int
    $targetClicks: Int
  ) {
    updateFeaturedVendor(
      id: $id
      image: $image
      text: $text
      page: $page
      position: $position
      rank: $rank
      impressions: $impressions
      clicks: $clicks
      targetImpressions: $targetImpressions
      targetClicks: $targetClicks
    ) {
      id
      vendor {
        id
        storeLink
        vendorVerified
        organization {
          id
          name
          nicename
          email
          phone
          address
          address2
          city
          country
          logo
        }
      }
      image
      text
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

export const UPDATE_FEATURED_VENDOR_IMPRESSIONS = gql`
  mutation UpdateFeaturedVendorImpressions($id: String!, $impressions: Int) {
    updateFeaturedVendorImpressions(id: $id, impressions: $impressions) {
      id
      impressions
    }
  }
`;

export const UPDATE_FEATURED_VENDOR_CLICKS = gql`
  mutation UpdateFeaturedVendorClicks($id: String!, $clicks: Int) {
    updateFeaturedVendorClicks(id: $id, clicks: $clicks) {
      id
      clicks
    }
  }
`;

export const DELETE_FEATURED_VENDOR = gql`
  mutation DeleteFeaturedVendor($id: String!) {
    deleteFeaturedVendor(id: $id) {
      id
    }
  }
`;
