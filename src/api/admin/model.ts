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
  query GetFilteredModels($filter: String!) {
    modelsFiltered(filter: $filter) {
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
  query GetModelById($id: String!) {
    modelById(id: $id) {
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
    $brandId: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    modelsByBrandId(
      brandId: $brandId
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
  mutation CreateModel(
    $name: String!
    $slug: String!
    $description: String
    $brandId: String!
  ) {
    createModel(
      name: $name
      slug: $slug
      description: $description
      brandId: $brandId
    ) {
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
  mutation UpdateModel(
    $id: String!
    $name: String
    $slug: String
    $description: String
    $brandId: String
  ) {
    updateModel(
      id: $id
      name: $name
      slug: $slug
      description: $description
      brandId: $brandId
    ) {
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
  mutation DeleteModel($id: String!) {
    deleteModel(id: $id) {
      id
      name
    }
  }
`;
