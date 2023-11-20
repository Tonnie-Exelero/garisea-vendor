import { gql } from "@apollo/client";

export const VENDOR_LOGIN = gql`
  mutation LoginVendor($pl: String!) {
    loginVendor(pl: $pl) {
      token
    }
  }
`;

export const VENDOR_LOGOUT = gql`
  mutation LogoutVendor($pl: String!) {
    logoutVendor(pl: $pl) {
      email
    }
  }
`;
