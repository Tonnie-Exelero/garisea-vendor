import { gql } from "@apollo/client";

export const GET_FEATURED_VENDORS = gql`
  query GetFeaturedVendors(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    featuredVendors(
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
              coverImage
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
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    featuredVendorsFiltered(
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
              coverImage
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
  query GetFeaturedVendorById($pl: String!) {
    featuredVendorById(pl: $pl) {
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
          coverImage
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
  mutation CreateFeaturedVendor($pl: String!) {
    createFeaturedVendor(pl: $pl) {
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
          coverImage
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
  mutation UpdateFeaturedVendor($pl: String!) {
    updateFeaturedVendor(pl: $pl) {
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
          coverImage
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

export const UPDATE_FEATURED_VENDOR_STATUS = gql`
  mutation UpdateFeaturedVendorStatus($pl: String!) {
    updateFeaturedVendorStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_FEATURED_VENDOR_IMPRESSIONS = gql`
  mutation UpdateFeaturedVendorImpressions($pl: String!) {
    updateFeaturedVendorImpressions(pl: $pl) {
      id
      impressions
    }
  }
`;

export const UPDATE_FEATURED_VENDOR_CLICKS = gql`
  mutation UpdateFeaturedVendorClicks($pl: String!) {
    updateFeaturedVendorClicks(pl: $pl) {
      id
      clicks
    }
  }
`;

export const DELETE_FEATURED_VENDOR = gql`
  mutation DeleteFeaturedVendor($pl: String!) {
    deleteFeaturedVendor(pl: $pl) {
      id
    }
  }
`;
