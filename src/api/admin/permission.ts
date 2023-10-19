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
  query GetFilteredPermissions($filter: String!) {
    permissionsFiltered(filter: $filter) {
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
  query GetPermissionById($id: String!) {
    permissionById(id: $id) {
      id
      name
      slug
      description
      subjects
    }
  }
`;

export const CREATE_PERMISSION = gql`
  mutation CreatePermission(
    $name: String!
    $slug: String!
    $description: String!
    $subjects: String!
  ) {
    createPermission(
      name: $name
      slug: $slug
      description: $description
      subjects: $subjects
    ) {
      id
      name
      slug
      description
      subjects
    }
  }
`;

export const UPDATE_PERMISSION = gql`
  mutation UpdatePermission(
    $id: String!
    $name: String
    $slug: String
    $description: String
    $subjects: String
  ) {
    updatePermission(
      id: $id
      name: $name
      slug: $slug
      description: $description
      subjects: $subjects
    ) {
      id
      name
      slug
      description
      subjects
    }
  }
`;

export const DELETE_PERMISSION = gql`
  mutation DeletePermission($id: String!) {
    deletePermission(id: $id) {
      id
      name
    }
  }
`;
