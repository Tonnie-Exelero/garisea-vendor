import { gql } from "@apollo/client";

export const GET_VENDORS = gql`
  query GetVendors($first: Int, $last: Int, $after: ID, $before: ID) {
    vendors(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          username
          image
          storeLink
          language
          status
          address
          city
          country
          emailVerified
          vendorVerified
          addedOrganization
          identification
          onlineStatus
          impressions
          pageOpened
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
            certificate
            kraPin
          }
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

export const GET_VENDORS_BY_STATUS = gql`
  query GetVendorsByStatus(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorsByStatus(
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
          firstName
          lastName
          username
          email
          phone
          image
          storeLink
          language
          status
          address
          city
          country
          emailVerified
          vendorVerified
          addedOrganization
          identification
          onlineStatus
          impressions
          pageOpened
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
            certificate
            kraPin
          }
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

export const GET_FILTERED_VENDORS = gql`
  query GetFilteredVendors(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorsFiltered(
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
          firstName
          lastName
          username
          email
          phone
          image
          storeLink
          language
          status
          address
          city
          country
          emailVerified
          vendorVerified
          addedOrganization
          identification
          onlineStatus
          impressions
          pageOpened
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
            certificate
            kraPin
          }
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

export const GET_VENDOR_BY_ID = gql`
  query GetVendorById($pl: String!) {
    vendorById(pl: $pl) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      impressions
      pageOpened
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
        certificate
        kraPin
      }
    }
  }
`;

export const GET_VENDOR_IF_NEW = gql`
  query GetVendorById($pl: String!) {
    vendorById(pl: $pl) {
      password
    }
  }
`;

export const GET_VENDOR_BY_EMAIL = gql`
  query GetVendorByEmail($pl: String!) {
    vendorByEmail(pl: $pl) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      impressions
      pageOpened
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
        certificate
        kraPin
      }
    }
  }
`;

export const GET_VENDOR_BY_STORE_LINK = gql`
  query GetVendorByStoreLink($pl: String!) {
    vendorByStoreLink(pl: $pl) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      impressions
      pageOpened
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
        certificate
        kraPin
      }
    }
  }
`;

export const GET_VENDOR_EMAIL = gql`
  query GetVendorEmail($pl: String!) {
    vendorCheckEmail(pl: $pl) {
      email
    }
  }
`;

export const GET_VENDOR_STORE_LINK = gql`
  query GetVendorStoreLink($pl: String!) {
    vendorStoreLink(pl: $pl) {
      storeLink
    }
  }
`;

export const GET_VENDOR_ANALYTICS = gql`
  query GetVendorAnalytics($pl: String!) {
    vendorById(pl: $pl) {
      id
      impressions
      pageOpened
    }
  }
`;

export const CREATE_VENDOR = gql`
  mutation CreateVendor($pl: String!) {
    createVendor(pl: $pl) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      impressions
      pageOpened
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
        certificate
        kraPin
      }
    }
  }
`;

export const UPDATE_VENDOR = gql`
  mutation UpdateVendor($pl: String!) {
    updateVendor(pl: $pl) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      impressions
      pageOpened
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
        certificate
        kraPin
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdateVendorPassword($pl: String!) {
    updateVendorPassword(pl: $pl) {
      id
      firstName
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($pl: String!) {
    updateVendorImage(pl: $pl) {
      id
      image
    }
  }
`;

export const UPDATE_VENDOR_STATUS = gql`
  mutation UpdateVendorStatus($pl: String!) {
    updateVendorStatus(pl: $pl) {
      id
      status
    }
  }
`;

export const UPDATE_VENDOR_IDENTIFICATION = gql`
  mutation UpdateVendorIdentification($pl: String!) {
    updateVendorIdentification(pl: $pl) {
      id
      identification
    }
  }
`;

export const UPDATE_VENDOR_VERIFIED = gql`
  mutation UpdateVendorVerified($pl: String!) {
    updateVendorVerified(pl: $pl) {
      id
      vendorVerified
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateVendorEmailVerified($pl: String!) {
    updateVendorEmailVerified(pl: $pl) {
      id
      emailVerified
    }
  }
`;
export const UPDATE_ADDED_ORGANIZATION = gql`
  mutation UpdateVendorAddedOrganization($pl: String!) {
    updateVendorAddedOrganization(pl: $pl) {
      id
      addedOrganization
    }
  }
`;

export const UPDATE_VENDOR_IMPRESSIONS = gql`
  mutation UpdateVendorImpressions($pl: String!) {
    updateVendorImpressions(pl: $pl) {
      id
      impressions
    }
  }
`;

export const UPDATE_VENDOR_PAGE_OPENED = gql`
  mutation UpdateVehiclePageOpened($pl: String!) {
    updateVendorPageOpened(pl: $pl) {
      id
      pageOpened
    }
  }
`;

export const DELETE_VENDOR = gql`
  mutation DeleteVendor($pl: String!) {
    deleteVendor(pl: $pl) {
      id
    }
  }
`;
