import { gql } from "@apollo/client";

export const CUSTOMER_LOGIN = gql`
  mutation LoginCustomer($pl: String!) {
    loginCustomer(pl: $pl) {
      token
    }
  }
`;
