import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query GetBrands($first: Int, $last: Int, $after: ID, $before: ID) {
    brands(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          name
          slug
          description
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

export const GET_FILTERED_BRANDS = gql`
  query GetFilteredBrands($filter: String!) {
    brandsFiltered(filter: $filter) {
      edges {
        cursor
        node {
          id
          name
          slug
          description
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

export const GET_BRAND_BY_ID = gql`
  query GetBrandById($id: String!) {
    brandById(id: $id) {
      id
      name
      slug
      description
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($name: String!, $slug: String!, $description: String) {
    createBrand(name: $name, slug: $slug, description: $description) {
      id
      name
      slug
      description
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand(
    $id: String!
    $name: String
    $slug: String
    $description: String
  ) {
    updateBrand(id: $id, name: $name, slug: $slug, description: $description) {
      id
      name
      slug
      description
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($id: String!) {
    deleteBrand(id: $id) {
      id
      name
    }
  }
`;
