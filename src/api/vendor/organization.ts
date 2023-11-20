import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations($first: Int, $last: Int, $after: ID, $before: ID) {
    organizations(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
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

export const GET_FILTERED_ORGANIZATIONS = gql`
  query GetFilteredOrganizations(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    organizationsFiltered(
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

export const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($pl: String!) {
    organizationById(pl: $pl) {
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
`;

export const GET_ORGANIZATION_BY_NAME = gql`
  query GetOrganizationByName($pl: String!) {
    organizationByName(pl: $pl) {
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
`;

export const GET_ORGANIZATION_NAME = gql`
  query GetOrganizationName($pl: String!) {
    organizationCheckName(pl: $pl) {
      name
    }
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($pl: String!) {
    createOrganization(pl: $pl) {
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
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($pl: String!) {
    updateOrganization(pl: $pl) {
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
`;

export const UPDATE_COVER_IMAGE = gql`
  mutation UpdateCoverImage($pl: String!) {
    updateOrganizationCoverImage(pl: $pl) {
      id
      coverImage
    }
  }
`;

export const UPDATE_LOGO = gql`
  mutation UpdateLogo($pl: String!) {
    updateOrganizationLogo(pl: $pl) {
      id
      logo
    }
  }
`;

export const UPDATE_CERTIFICATE = gql`
  mutation UpdateCertificate($pl: String!) {
    updateOrganizationCertificate(pl: $pl) {
      id
      certificate
    }
  }
`;

export const UPDATE_KRA_PIN = gql`
  mutation UpdateKRAPin($pl: String!) {
    updateOrganizationKRAPin(pl: $pl) {
      id
      kraPin
    }
  }
`;

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($pl: String!) {
    deleteOrganization(pl: $pl) {
      id
    }
  }
`;
