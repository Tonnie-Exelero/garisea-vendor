import { gql } from "@apollo/client";

export const GET_BRANDS = gql`
  query GetBrands(
    $hasVehicles: String
    $orderBy: String
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    brands(
      hasVehicles: $hasVehicles
      orderBy: $orderBy
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
  query GetFilteredBrands($filter: String!) {
    brandsFiltered(filter: $filter) {
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
  query GetBrandById($id: String!) {
    brandById(id: $id) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const GET_BRAND_BY_SLUG = gql`
  query GetBrandBySlug($slug: String!) {
    brandBySlug(slug: $slug) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand(
    $name: String!
    $slug: String!
    $description: String
    $image: String
  ) {
    createBrand(
      name: $name
      slug: $slug
      description: $description
      image: $image
    ) {
      id
      name
      slug
      description
      image
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation UpdateBrand(
    $id: String!
    $name: String
    $slug: String
    $description: String
    $image: String
  ) {
    updateBrand(
      id: $id
      name: $name
      slug: $slug
      description: $description
      image: $image
    ) {
      id
      name
      slug
      description
      image
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
