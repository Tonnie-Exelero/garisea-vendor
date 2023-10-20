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
  query GetFilteredRoles($filter: String!) {
    rolesFiltered(filter: $filter) {
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
  query GetRoleById($id: String!) {
    roleById(id: $id) {
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
  mutation CreateSuperAdminRole(
    $name: String!
    $slug: String!
    $description: String!
    $ability: String!
  ) {
    createSuperAdminRole(
      name: $name
      slug: $slug
      description: $description
      ability: $ability
    ) {
      id
      name
      slug
      description
      ability
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation CreateRole(
    $name: String!
    $slug: String!
    $description: String!
    $ability: String!
    $permissions: [String!]!
  ) {
    createRole(
      name: $name
      slug: $slug
      description: $description
      ability: $ability
      permissions: $permissions
    ) {
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
  mutation UpdateRole(
    $id: String!
    $name: String
    $slug: String
    $description: String
    $ability: String
    $permissions: [String!]
  ) {
    updateRole(
      id: $id
      name: $name
      slug: $slug
      description: $description
      ability: $ability
      permissions: $permissions
    ) {
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
  mutation DeleteRole($id: String!) {
    deleteRole(id: $id) {
      id
      name
    }
  }
`;
