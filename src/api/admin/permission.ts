import { gql } from "@apollo/client";

export const GET_PERMISSIONS = gql`
  query GetPermissions($first: Int, $last: Int, $after: ID, $before: ID) {
    permissions(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          slug
          description
          subjects
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

export const GET_FILTERED_PERMISSIONS = gql`
  query GetFilteredPermissions(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    permissionsFiltered(
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
          subjects
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

export const GET_PERMISSION_BY_ID = gql`
  query GetPermissionById($pl: String!) {
    permissionById(pl: $pl) {
      id
      name
      slug
      description
      subjects
    }
  }
`;

export const CREATE_PERMISSION = gql`
  mutation CreatePermission($pl: String!) {
    createPermission(pl: $pl) {
      id
      name
      slug
      description
      subjects
    }
  }
`;

export const UPDATE_PERMISSION = gql`
  mutation UpdatePermission($pl: String!) {
    updatePermission(pl: $pl) {
      id
      name
      slug
      description
      subjects
    }
  }
`;

export const DELETE_PERMISSION = gql`
  mutation DeletePermission($pl: String!) {
    deletePermission(pl: $pl) {
      id
      name
    }
  }
`;
