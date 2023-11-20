import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query GetRoles($first: Int, $last: Int, $after: ID, $before: ID) {
    roles(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          slug
          description
          ability
          permissions {
            id
            name
            slug
            description
            subjects
          }
          users {
            id
            firstName
            lastName
            image
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

export const GET_FILTERED_ROLES = gql`
  query GetFilteredRoles(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    rolesFiltered(
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
          slug
          description
          ability
          permissions {
            id
            name
            slug
            description
            subjects
          }
          users {
            id
            firstName
            lastName
            image
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

export const GET_ROLE_BY_ID = gql`
  query GetRoleById($pl: String!) {
    roleById(pl: $pl) {
      id
      name
      slug
      description
      ability
      permissions {
        id
        name
        slug
        description
        subjects
      }
      users {
        id
        firstName
        lastName
        image
      }
    }
  }
`;

export const CREATE_SUPERADMIN_ROLE = gql`
  mutation CreateSuperAdminRole($pl: String!) {
    createSuperAdminRole(pl: $pl) {
      id
      name
      slug
      description
      ability
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole($pl: String!) {
    createRole(pl: $pl) {
      id
      name
      slug
      description
      ability
      permissions {
        id
        name
        slug
        description
        subjects
      }
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($pl: String!) {
    updateRole(pl: $pl) {
      id
      name
      slug
      description
      ability
      permissions {
        id
        name
        slug
        description
        subjects
      }
      users {
        id
        firstName
        lastName
        image
      }
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($pl: String!) {
    deleteRole(pl: $pl) {
      id
      name
    }
  }
`;
