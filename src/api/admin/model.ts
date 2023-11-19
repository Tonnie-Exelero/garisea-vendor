import { gql } from "@apollo/client";

export const GET_MODELS = gql`
  query GetModels($first: Int, $last: Int, $after: ID, $before: ID) {
    models(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          slug
          description
          brand {
            id
            name
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

export const GET_FILTERED_MODELS = gql`
  query GetFilteredModels(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    modelsFiltered(
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
          brand {
            id
            name
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

export const GET_MODEL_BY_ID = gql`
  query GetModelById($pl: String!) {
    modelById(pl: $pl) {
      id
      name
      slug
      description
      brand {
        id
        name
      }
    }
  }
`;

export const GET_MODELS_BY_BRAND_ID = gql`
  query GetModels(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    modelsByBrandId(
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
          brand {
            id
            name
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

export const CREATE_MODEL = gql`
  mutation CreateModel($pl: String!) {
    createModel(pl: $pl) {
      id
      name
      slug
      description
      brand {
        id
        name
      }
    }
  }
`;

export const UPDATE_MODEL = gql`
  mutation UpdateModel($pl: String!) {
    updateModel(pl: $pl) {
      id
      name
      slug
      description
      brand {
        id
        name
      }
    }
  }
`;

export const DELETE_MODEL = gql`
  mutation DeleteModel($pl: String!) {
    deleteModel(pl: $pl) {
      id
      name
    }
  }
`;
