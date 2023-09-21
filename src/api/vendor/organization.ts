import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations($first: Int, $last: Int, $after: ID, $before: ID) {
    organizations(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          email
          phone
          address
          address2
          city
          country
          logo
          certificate
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
  query GetFilteredOrganizations($filter: String!) {
    organizationsFiltered(filter: $filter) {
      edges {
        cursor
        node {
          id
          name
          email
          phone
          address
          address2
          city
          country
          logo
          certificate
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
  query GetOrganizationById($id: String!) {
    organizationById(id: $id) {
      id
      name
      email
      phone
      address
      address2
      city
      country
      logo
      certificate
    }
  }
`;

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization(
    $name: String!
    $email: String
    $phone: String
    $address: String
    $address2: String
    $city: String
    $country: String
    $logo: String
    $certificate: String
  ) {
    createOrganization(
      name: $name
      email: $email
      phone: $phone
      address: $address
      address2: $address2
      city: $city
      country: $country
      logo: $logo
      certificate: $certificate
    ) {
      id
      name
      email
      phone
      address
      address2
      city
      country
      logo
      certificate
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization(
    $id: String!
    $name: String
    $email: String
    $phone: String
    $address: String
    $address2: String
    $city: String
    $country: String
    $logo: String
    $certificate: String
  ) {
    updateOrganization(
      id: $id
      name: $name
      email: $email
      phone: $phone
      address: $address
      address2: $address2
      city: $city
      country: $country
      logo: $logo
      certificate: $certificate
    ) {
      id
      name
      email
      phone
      address
      address2
      city
      country
      logo
      certificate
    }
  }
`;

export const UPDATE_LOGO = gql`
  mutation UpdateLogo($id: String!, $logo: String!) {
    updateOrganizationLogo(id: $id, logo: $logo) {
      id
      name
      email
      phone
      address
      address2
      city
      country
      logo
      certificate
    }
  }
`;

export const UPDATE_CERTIFICATE = gql`
  mutation UpdateCertificate($id: String!, $certificate: String!) {
    updateOrganizationCertificate(id: $id, certificate: $certificate) {
      id
      name
      email
      phone
      address
      address2
      city
      country
      logo
      certificate
    }
  }
`;

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($id: String!) {
    deleteOrganization(id: $id) {
      id
      name
    }
  }
`;
