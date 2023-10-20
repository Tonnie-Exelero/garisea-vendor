import { gql } from "@apollo/client";

export const GET_VENDORS = gql`
  query GetVendors($first: Int, $last: Int, $after: ID, $before: ID) {
    vendors(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          username
          email
          phone
          image
          storeLink
          language
          status
          address
          city
          country
          emailVerified
          vendorVerified
          addedOrganization
          identification
          onlineStatus
          organization {
            id
            name
            nicename
            email
            phone
            address
            address2
            city
            country
            logo
            certificate
            kraPin
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

export const GET_VENDORS_BY_STATUS = gql`
  query GetVendorsByStatus(
    $status: String!
    $first: Int
    $last: Int
    $after: ID
    $before: ID
  ) {
    vendorsByStatus(
      status: $status
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          username
          email
          phone
          image
          storeLink
          language
          status
          address
          city
          country
          emailVerified
          vendorVerified
          addedOrganization
          identification
          onlineStatus
          organization {
            id
            name
            nicename
            email
            phone
            address
            address2
            city
            country
            logo
            certificate
            kraPin
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

export const GET_FILTERED_VENDORS = gql`
  query GetFilteredVendors($filter: String!) {
    vendorsFiltered(filter: $filter) {
      edges {
        cursor
        node {
          id
          firstName
          lastName
          username
          email
          phone
          image
          storeLink
          language
          status
          address
          city
          country
          emailVerified
          vendorVerified
          addedOrganization
          identification
          onlineStatus
          organization {
            id
            name
            nicename
            email
            phone
            address
            address2
            city
            country
            logo
            certificate
            kraPin
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

export const GET_VENDOR_BY_ID = gql`
  query GetVendorById($id: String!) {
    vendorById(id: $id) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;

export const GET_VENDOR_BY_EMAIL = gql`
  query GetVendorByEmail($email: String!) {
    vendorByEmail(email: $email) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;

export const GET_VENDOR_EMAIL = gql`
  query GetVendorEmail($email: String!) {
    vendorCheckEmail(email: $email) {
      email
    }
  }
`;

export const GET_VENDOR_STORE_LINK = gql`
  query GetVendorStoreLink($storeLink: String!) {
    vendorStoreLink(storeLink: $storeLink) {
      storeLink
    }
  }
`;

export const CREATE_VENDOR = gql`
  mutation CreateVendor(
    $firstName: String
    $lastName: String
    $username: String
    $email: String!
    $password: String
    $phone: String
    $image: String
    $storeLink: String
    $language: String
    $status: String
    $address: String
    $city: String
    $country: String
    $emailVerified: String
    $vendorVerified: String
    $addedOrganization: String
    $organizationId: String
  ) {
    createVendor(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      phone: $phone
      image: $image
      storeLink: $storeLink
      language: $language
      status: $status
      address: $address
      city: $city
      country: $country
      emailVerified: $emailVerified
      vendorVerified: $vendorVerified
      addedOrganization: $addedOrganization
      organizationId: $organizationId
    ) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;

export const UPDATE_VENDOR = gql`
  mutation UpdateVendor(
    $id: String!
    $firstName: String
    $lastName: String
    $username: String
    $phone: String
    $image: String
    $language: String
    $status: String
    $address: String
    $city: String
    $country: String
    $organizationId: String
  ) {
    updateVendor(
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      phone: $phone
      image: $image
      language: $language
      status: $status
      address: $address
      city: $city
      country: $country
      organizationId: $organizationId
    ) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdateVendorPassword($id: String!, $password: String!) {
    updateVendorPassword(id: $id, password: $password) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage($id: String!, $image: String!) {
    updateVendorImage(id: $id, image: $image) {
      id
      image
    }
  }
`;

export const UPDATE_VENDOR_STATUS = gql`
  mutation UpdateVendorStatus($id: String!, $status: String!) {
    updateVendorStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const UPDATE_VENDOR_IDENTIFICATION = gql`
  mutation UpdateVendorIdentification($id: String!, $identification: String!) {
    updateVendorIdentification(id: $id, identification: $identification) {
      id
      identification
    }
  }
`;

export const UPDATE_VENDOR_VERIFIED = gql`
  mutation UpdateVendorVerified($id: String!, $vendorVerified: String!) {
    updateVendorVerified(id: $id, vendorVerified: $vendorVerified) {
      id
      vendorVerified
    }
  }
`;

export const UPDATE_EMAIL_VERIFIED = gql`
  mutation UpdateVendorEmailVerified($id: String!, $emailVerified: String!) {
    updateVendorEmailVerified(id: $id, emailVerified: $emailVerified) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;
export const UPDATE_ADDED_ORGANIZATION = gql`
  mutation UpdateVendorAddedOrganization(
    $id: String!
    $addedOrganization: String!
  ) {
    updateVendorAddedOrganization(
      id: $id
      addedOrganization: $addedOrganization
    ) {
      id
      firstName
      lastName
      username
      email
      phone
      image
      storeLink
      language
      status
      address
      city
      country
      emailVerified
      vendorVerified
      addedOrganization
      identification
      onlineStatus
      organization {
        id
        name
        nicename
        email
        phone
        address
        address2
        city
        country
        logo
        certificate
        kraPin
      }
    }
  }
`;

export const DELETE_VENDOR = gql`
  mutation DeleteVendor($id: String!) {
    deleteVendor(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
