import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query GetBrands(
    $pl: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    brands(
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
          image
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
  query GetFilteredBrands(
    $pl: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    brandsFiltered(
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
          image
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
  query GetBrandById($pl: String!) {
    brandById(pl: $pl) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const GET_BRAND_BY_SLUG = gql`
  query GetBrandBySlug($pl: String!) {
    brandBySlug(pl: $pl) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($pl: String!) {
    createBrand(pl: $pl) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand($pl: String!) {
    updateBrand(pl: $pl) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation DeleteBrand($pl: String!) {
    deleteBrand(pl: $pl) {
      id
      name
    }
  }
`;
